import React, { useState, useEffect, useRef } from "react";
import { GitHubWrappedData } from "@/lib/types";
import SidebarContent from "@/components/UI/SidebarContent";
import ExportButtons from "@/components/UI/ExportButtons";

interface SidebarWithExportButtonsProps {
  username: string;
  data: GitHubWrappedData;
  onBackClick: () => void;
}

const SidebarWithExportButtons: React.FC<SidebarWithExportButtonsProps> = ({
  username,
  data,
  onBackClick,
}) => {
  const [targetPosition, setTargetPosition] = useState({ x: 16, y: 16 }); // Target position
  const [smoothPosition, setSmoothPosition] = useState({ x: 16, y: 16 }); // Smoothly animated position
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetPosition = () => {
    setTargetPosition({ x: 16, y: 16 });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
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
  );
};

export default SidebarWithExportButtons;
