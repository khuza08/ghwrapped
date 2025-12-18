import React, { useState, useEffect, useRef } from "react";
import { GitHubWrappedData } from "@/lib/types";
import SidebarContent from "@/components/UI/SidebarContent";
import ExportButtons from "@/components/UI/ExportButtons";

interface DraggableSidebarProps {
  username: string;
  data: GitHubWrappedData;
  onBackClick: () => void;
  currentSlide?: number;
  goToPrevSlide?: () => void;
  goToNextSlide?: () => void;
}

const DraggableSidebar: React.FC<DraggableSidebarProps> = ({
  username,
  data,
  onBackClick,
}) => {
  const [targetPosition, setTargetPosition] = useState({ x: 16, y: 16 }); // Target position
  const [smoothPosition, setSmoothPosition] = useState({ x: 16, y: 16 }); // Smoothly animated position
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(0);
  const [dragCount, setDragCount] = useState(0);
  const animationRef = useRef<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const interpolatePosition = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    factor: number,
  ) => {
    return {
      x: start.x + (end.x - start.x) * factor,
      y: start.y + (end.y - start.y) * factor,
    };
  };

  useEffect(() => {
    const animate = () => {
      if (isDragging) {
        setSmoothPosition((prev) =>
          interpolatePosition(prev, targetPosition, 0.08),
        );
      } else {
        setSmoothPosition((prev) =>
          interpolatePosition(prev, targetPosition, 0.15),
        );

        const distance = Math.sqrt(
          Math.pow(smoothPosition.x - targetPosition.x, 2) +
            Math.pow(smoothPosition.y - targetPosition.y, 2),
        );

        if (distance > 0.5) {
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition, isDragging, smoothPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sidebarRef.current) {
      const rect = sidebarRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setTargetPosition({
      x: newX,
      y: newY,
    });
  };

  const showNotificationWithTimeout = () => {
    setShowNotification(true);
    setNotificationOpacity(0); // Start with 0 opacity

    // Fade in the notification
    setTimeout(() => {
      setNotificationOpacity(1);
    }, 10); // Small delay to allow re-render

    // Clear any existing timeout before setting a new one
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    // Auto hide notification after 1 second with fade out
    notificationTimeoutRef.current = setTimeout(() => {
      setNotificationOpacity(0);
      setTimeout(() => {
        setShowNotification(false);
      }, 300);
    }, 5000);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    setDragCount((prev) => prev + 1);
    showNotificationWithTimeout();
  };

  const resetPosition = () => {
    setTargetPosition({ x: 16, y: 16 });
    showNotificationWithTimeout();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "r" || e.key === "R") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        resetPosition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative">
      {/* Bubble */}
      {showNotification && (
        <div
          className="fixed z-60 pointer-events-none transition-all duration-300"
          style={{
            left: `${smoothPosition.x + 128}px`,
            top: `${smoothPosition.y + 220}px`,
            opacity: notificationOpacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div
            className="bg-white/5 text-white text-sm font-bold backdrop-blur-lg border border-white/20 py-3 px-6 rounded-full
            shadow-xl flex items-center space-x-2 transform transition-all -translate-x-1/2 z-10"
          >
            <span>
              PRESS{" "}
              <kbd className="px-3 py-1 text-xs rounded-md bg-white/20 font-mono">
                R
              </kbd>{" "}
              TO RESET ME!
            </span>
          </div>
        </div>
      )}

      {/* Draggable Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed z-50 flex flex-col gap-4 w-64 max-w-xs cursor-move"
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
          userSelect: isDragging ? "none" : "auto",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full">
          <SidebarContent username={username} onBackClick={onBackClick} />
        </div>
        <div className="w-full">
          <ExportButtons data={data} />
        </div>
      </div>
    </div>
  );
};

export default DraggableSidebar;
