import React, { useEffect, useRef } from 'react';

interface AudioWaveformCanvasProps {
  isPlaying: boolean;
  barColor?: string;
  height?: number;
}

export const AudioWaveformCanvas: React.FC<AudioWaveformCanvasProps> = ({
  isPlaying,
  barColor = '#FF2A85',
  height = 48
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const numBars = 48;
    const barWidth = 3;
    const barGap = 3;

    // Fixed seeded heights for paused state
    const baseHeights = Array.from({ length: numBars }, (_, i) => {
      return 0.2 + Math.sin(i * 0.3) * 0.3 + (i % 3 === 0 ? 0.2 : 0.05);
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const ch = canvas.height;

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barGap);
        let barHMultiplier = baseHeights[i];

        if (isPlaying) {
          const time = Date.now() * 0.005;
          barHMultiplier = Math.max(
            0.15,
            Math.abs(Math.sin(time + i * 0.2) * 0.8 + Math.cos(time * 1.5 + i) * 0.2)
          );
        }

        const barHeight = barHMultiplier * (ch - 8);
        const y = (ch - barHeight) / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(0.5, '#FFB800');
        gradient.addColorStop(1, '#00E5FF');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, barColor]);

  return (
    <canvas
      ref={canvasRef}
      width={288}
      height={height}
      className="w-full max-w-[288px] h-12"
    />
  );
};
