"use client";

import { memo, useEffect, useRef, useState, useCallback } from "react";

// Developer Syntax ASCII Portrait (64 columns x 33 lines)
const ASCII_LINES: string[] = [
  "                        ;{}}}}[[}{}}}](]<<)[};:                 ",
  "                    .;]///>>/>>>>>><>///>****//>{               ",
  "                .;(/>><>>//>>>>>>>>>//*>/>>/>>/>/*>(:           ",
  "               [//>>>>>/*///>/////><>/><<<>><>/////>/>}.        ",
  "           :{{{]((<<>/*/><))>////*/**/><>/><><>/><<<<</>)       ",
  "        .[//***>/>//>>/>>//>**++*////*/>>///*/>/*/>/*/*/*<      ",
  "        >//>***>/))(</*///////+/*/>/+/><><//>/=++//*///<>/>.    ",
  "       }*/////<<>//>//*/>>//<>*/>><<<><>*/*/**+**//<<()>//*<    ",
  "      .</>*>//<//*/+***>//<)>)/++*/<<(<<<////*//<)>/*/>///**[   ",
  "      ;:[<>/>/*/***+**+/><>/>>///*/)<)</**//*/>/>***++***//*(   ",
  "          :(/*/*++++**//////*//**/>//>)()></>)()/**///<<//>/)   ",
  "            .[[{]>><>***///+=++//))/>//<<//>>*<)/**/>><<>>>/>   ",
  "                ])(])/**///><>/>////****++***//>//><>//**=***   ",
  "               ;()(](>*/**//([[]/**/*/+*/>///>//><>/*+*+*/*/<   ",
  "              {)())(](/*////)]]))//<>>///*****/><//**++++*+/.   ",
  "              >>)((([](////><))<></+///***/*///<</***+*+++>;    ",
  "              .>*)<><))<//*>/>)((</*///****/>//>>>/**=++*(      ",
  "                >]]<>/**///*>)(][[<///>///*////**/+*=+<:        ",
  "               []}[[()///>>>)]][}}[)//*///*/>>///+***]          ",
  "              [[}}}}}])>//>))]]][}}[<////)](]])//***;           ",
  "             [}}}}}}}[]((][}{{}}[[[[)<<]])([}[(</*>:            ",
  "            }][}}}]]([}[[[}}}[]]]]]])<][}(}}][)>*(              ",
  "             ]/*/))<<)[[[[[](()(((]</<(]]}}}(<>+}               ",
  "             ]++//)[[)([[[])<))(()>*///([[[(>*+{                ",
  "              *****/><(]]]]](())<>*////)()<*+>.                 ",
  "             }>>//<<</)](((()<<<>//>//)()>/*+.                  ",
  "              >++*>][()[())<>>>/**>/>)[]()>*)                   ",
  "              )///<]}[]()<>>/*/////>(]]()</*)                   ",
  "              </*>]}{[)>/*///////>>)((()</*+>                   ",
  "              ]*+//>>///>>/*/>>>>><)()<>/*++{                   ",
  "               ;}])((>/***>)((((](]](<>*+*+)                    ",
  "                     //>)(<([])<<)))</*+*/<                     ",
  "                     [())(])>/>><))</+/><)                      ",
];

const RANDOM_SYNTAX = "{};:[]()<>/*+=#@!%&~";

interface ColumnState {
  delay: number;
  row: number; // floating row position
  speed: number;
}

export interface AsciiAvatarProps {
  startTrigger?: boolean;
  onComplete?: () => void;
}

const AsciiAvatar: React.FC<AsciiAvatarProps> = memo(function AsciiAvatar({
  startTrigger = false,
  onComplete,
}: AsciiAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startSkyRain = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsCompleted(false);
    cancelAnimationFrame(animRef.current);

    const cols = 64;
    const rows = 33;

    // Responsive character sizing based on canvas display width
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 380;
    const height = rect.height || 320;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const charW = width / cols;
    const charH = height / rows;
    const fontSize = Math.max(7, Math.floor(charH * 0.95));

    // Initialize sky-rain state for each column
    // Columns drop from top ("from sky") with fast organic cascading delay
    const colStates: ColumnState[] = Array.from({ length: cols }, (_, c) => ({
      // Stagger slightly from left/center with wave variation
      delay: ((c * 14) % 320) + Math.sin(c * 0.4) * 80 + Math.random() * 60,
      row: -2 - Math.random() * 4, // start above the screen
      speed: 0.65 + Math.random() * 0.35, // fast drop speed (rows per frame)
    }));

    let startTime: number | null = null;
    let hasTriggeredComplete = false;

    const renderFrame = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      let allDone = true;

      // Draw each column
      for (let c = 0; c < cols; c++) {
        const state = colStates[c];

        if (elapsed < state.delay) {
          allDone = false;
          continue;
        }

        // Advance falling position
        state.row += state.speed;
        const activeRow = Math.floor(state.row);

        if (activeRow < rows) {
          allDone = false;
        }

        // Draw locked characters above the current head
        const limit = Math.min(rows, Math.max(0, activeRow));
        for (let r = 0; r < limit; r++) {
          const ch = ASCII_LINES[r][c];
          if (ch && ch !== " ") {
            // Gradient vertical color shift: emerald -> teal -> bright emerald
            const colorProgress = r / rows;
            const rVal = Math.round(78 - colorProgress * 50);
            const gVal = Math.round(222 - colorProgress * 15);
            const bVal = Math.round(163 + colorProgress * 18);
            ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
            ctx.shadowColor = "rgba(78, 222, 163, 0.45)";
            ctx.shadowBlur = 4;
            ctx.fillText(ch, c * charW, r * charH);
          }
        }

        // Draw the falling "head" key dropped from the sky
        if (activeRow >= 0 && activeRow < rows) {
          // Falling key: bright glowing white/emerald with cyber random scramble
          const randomChar =
            Math.random() > 0.4
              ? RANDOM_SYNTAX[Math.floor(Math.random() * RANDOM_SYNTAX.length)]
              : ASCII_LINES[activeRow][c] || "*";

          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#4edea3";
          ctx.shadowBlur = 10;
          ctx.fillText(randomChar, c * charW, activeRow * charH);

          // Faint trailing particle behind the drop
          if (activeRow > 0) {
            ctx.fillStyle = "rgba(78, 222, 163, 0.85)";
            ctx.shadowBlur = 6;
            ctx.fillText(
              RANDOM_SYNTAX[Math.floor(Math.random() * RANDOM_SYNTAX.length)],
              c * charW,
              (activeRow - 1) * charH
            );
          }
        }
      }

      if (!allDone) {
        animRef.current = requestAnimationFrame(renderFrame);
      } else {
        // Final crystal clear static draw (0 RAF loop after completion!)
        ctx.clearRect(0, 0, width, height);
        ctx.shadowBlur = 0;
        for (let r = 0; r < rows; r++) {
          const colorProgress = r / rows;
          const rVal = Math.round(78 - colorProgress * 50);
          const gVal = Math.round(222 - colorProgress * 15);
          const bVal = Math.round(163 + colorProgress * 18);
          ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;

          for (let c = 0; c < cols; c++) {
            const ch = ASCII_LINES[r][c];
            if (ch && ch !== " ") {
              ctx.fillText(ch, c * charW, r * charH);
            }
          }
        }
        setIsCompleted(true);

        if (!hasTriggeredComplete) {
          hasTriggeredComplete = true;
          onCompleteRef.current?.();
        }
      }
    };

    animRef.current = requestAnimationFrame(renderFrame);
  }, []);

  // Trigger when startTrigger becomes true (or on click to replay)
  useEffect(() => {
    if (!startTrigger) return;

    const t = setTimeout(() => {
      startSkyRain();
    }, 100);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animRef.current);
    };
  }, [startTrigger, startSkyRain]);

  return (
    <div
      onClick={startSkyRain}
      className="group relative cursor-pointer select-none"
      title="Click to re-drop cyber keystrokes from sky"
    >
      {/* ── High-Performance Canvas for Sky-Drop Animation ── */}
      <canvas
        ref={canvasRef}
        className="w-[280px] sm:w-[330px] lg:w-[380px] xl:w-[410px] h-[240px] sm:h-[280px] lg:h-[320px] xl:h-[345px] transition-transform duration-300 group-hover:scale-[1.02]"
      />

      {/* Ambient background glow beneath the ASCII characters */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{
          background: "radial-gradient(circle, #4edea3 0%, #00d4b4 45%, transparent 70%)",
        }}
      />
    </div>
  );
});

export default AsciiAvatar;
