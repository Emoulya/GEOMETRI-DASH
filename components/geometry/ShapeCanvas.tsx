"use client";

/**
 * ShapeCanvas — SVG Canvas untuk Render Bangun (FR-02)
 *
 * Kanvas SVG menampilkan satu bangun besar di tengah.
 * Tidak berisi elemen dekoratif (UXR-03).
 * Semua transformasi tervalidasi MATH-01…12.
 * Animasi transisi ≤ 300 ms.
 */

import { useMemo } from "react";
import type {
  ShapeDefinition,
  LingkaranDef,
  Point,
} from "@/lib/geometry/types";
import {
  getVertices,
  getSVGPath,
  deriveProperties,
} from "@/lib/geometry/engine";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type HighlightMode = "none" | "sisi" | "sudut" | "titik-sudut";

export interface SideHighlight {
  index: number;
  color: string;
  counted: boolean;
}

export interface AngleHighlight {
  index: number;
  color: string;
  counted: boolean;
}

export interface VertexHighlight {
  index: number;
  color: string;
  counted: boolean;
}

interface ShapeCanvasProps {
  shape: ShapeDefinition;
  highlightMode?: HighlightMode;
  highlightedSides?: SideHighlight[];
  highlightedAngles?: AngleHighlight[];
  highlightedVertices?: VertexHighlight[];
  activeCharacteristic?: string;
  onSideClick?: (index: number) => void;
  onAngleClick?: (index: number) => void;
  onVertexClick?: (index: number) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CANVAS_SIZE = 300;
const CANVAS_CENTER = CANVAS_SIZE / 2;
const SCALE_FACTOR = 22; // unit geometri → pixel SVG
const SIDE_COLOR = "var(--geo-side)";
const ANGLE_COLOR = "var(--geo-angle)";
const VERTEX_COLOR = "var(--geo-vertex)";
const RIGHT_ANGLE_SIZE = 12;
const ARC_RADIUS = 18;
const TICK_SIZE = 8;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShapeCanvas({
  shape,
  highlightMode = "none",
  highlightedSides = [],
  highlightedAngles = [],
  highlightedVertices = [],
  activeCharacteristic,
  onSideClick,
  onAngleClick,
  onVertexClick,
  className = "",
}: ShapeCanvasProps) {
  const props = useMemo(() => deriveProperties(shape), [shape]);
  const vertices = useMemo(() => getVertices(shape), [shape]);
  const svgPath = useMemo(() => getSVGPath(shape), [shape]);

  /** Skala vertices ke pixel SVG */
  const scaledVertices: Point[] = useMemo(
    () =>
      vertices.map((v) => ({
        x: CANVAS_CENTER + v.x * SCALE_FACTOR,
        y: CANVAS_CENTER + v.y * SCALE_FACTOR,
      })),
    [vertices],
  );

  const isCircle = shape.type === "lingkaran";

  const nextSideIndex = useMemo(() => {
    if (highlightMode === "sisi" && !isCircle) {
      for (let i = 0; i < vertices.length; i++) {
        if (!highlightedSides.find((s) => s.index === i)) {
          return i;
        }
      }
    }
    return -1;
  }, [highlightMode, isCircle, vertices.length, highlightedSides]);

  const nextAngleIndex = useMemo(() => {
    if (highlightMode === "sudut" && !isCircle) {
      for (let i = 0; i < vertices.length; i++) {
        if (!highlightedAngles.find((a) => a.index === i)) {
          return i;
        }
      }
    }
    return -1;
  }, [highlightMode, isCircle, vertices.length, highlightedAngles]);

  const nextVertexIndex = useMemo(() => {
    if (highlightMode === "titik-sudut" && !isCircle) {
      for (let i = 0; i < vertices.length; i++) {
        if (!highlightedVertices.find((v) => v.index === i)) {
          return i;
        }
      }
    }
    return -1;
  }, [highlightMode, isCircle, vertices.length, highlightedVertices]);


  return (
    <svg
      viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
      className={`w-full max-w-[320px] aspect-square ${className}`}
      role="img"
      aria-label={`Bangun ${shape.type}`}
    >
      <g
        transform={`rotate(${shape.rotation} ${CANVAS_CENTER} ${CANVAS_CENTER})`}
        style={{ transition: "transform 250ms ease-out" }}
      >
        {/* Shape fill */}
        {isCircle ? (
          <circle
            cx={CANVAS_CENTER}
            cy={CANVAS_CENTER}
            r={(shape as LingkaranDef).params.r * SCALE_FACTOR}
            fill={shape.fillColor}
            fillOpacity={0.15}
            stroke={shape.strokeColor}
            strokeWidth={2.5}
            style={{ transition: "all 250ms ease-out" }}
          />
        ) : (
          <path
            d={scaledVertices
              .map((v, i) => `${i === 0 ? "M" : "L"} ${v.x} ${v.y}`)
              .concat("Z")
              .join(" ")}
            fill={shape.fillColor}
            fillOpacity={0.15}
            stroke={shape.strokeColor}
            strokeWidth={2.5}
            strokeLinejoin="round"
            style={{ transition: "all 250ms ease-out" }}
          />
        )}

        {/* Highlight overlay: Sisi */}
        {highlightMode === "sisi" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const next = scaledVertices[(i + 1) % scaledVertices.length];
            const sideHighlight = highlightedSides.find(
              (s) => s.index === i,
            );
            const isHighlighted = !!sideHighlight;
            const strokeColor = sideHighlight?.color ?? SIDE_COLOR;
            const isNextSide = i === nextSideIndex;

            let arrowGroup = null;
            if (isNextSide) {
              const mx = (v.x + next.x) / 2;
              const my = (v.y + next.y) / 2;
              const dx = next.x - v.x;
              const dy = next.y - v.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              if (len > 0) {
                const nx = -dy / len;
                const ny = dx / len;
                
                const cx = mx - CANVAS_CENTER;
                const cy = my - CANVAS_CENTER;
                const dot = nx * cx + ny * cy;
                const isOutward = dot > 0;
                
                const outNx = isOutward ? nx : -nx;
                const outNy = isOutward ? ny : -ny;
                const inNx = -outNx;
                const inNy = -outNy;
                
                const arrowX = mx + outNx * 32;
                const arrowY = my + outNy * 32;
                const angle = Math.atan2(inNy, inNx) * (180 / Math.PI);
                
                arrowGroup = (
                  <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
                    <g>
                      <animateTransform attributeName="transform" type="translate" values="-4,0; 4,0; -4,0" dur="1s" repeatCount="indefinite" />
                      <path d="M-12,-8 L4,0 L-12,8 L-6,0 Z" fill="var(--geo-side)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    </g>
                  </g>
                );
              }
            }

            return (
              <g key={`side-${i}`}>
                {/* Clickable side line */}
                <line
                  x1={v.x}
                  y1={v.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={isHighlighted ? strokeColor : "transparent"}
                  strokeWidth={isHighlighted ? 4 : 0}
                  strokeLinecap="round"
                  style={{ transition: "all 200ms ease-out" }}
                />
                {/* Invisible wider hit area */}
                <line
                  x1={v.x}
                  y1={v.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="transparent"
                  strokeWidth={20}
                  className="cursor-pointer"
                  onClick={() => onSideClick?.(i)}
                  role="button"
                  aria-label={`Sisi ${i + 1}: ${props.sideLengths[i]} cm`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSideClick?.(i);
                    }
                  }}
                />
                {/* Tick mark on highlighted side */}
                {isHighlighted && (
                  <TickMark
                    p1={v}
                    p2={next}
                    counted={sideHighlight!.counted}
                  />
                )}
                {/* Side length label */}
                {isHighlighted && (
                  <SideLabel
                    p1={v}
                    p2={next}
                    length={props.sideLengths[i]}
                    rotation={shape.rotation}
                  />
                )}
                {/* Next Side Arrow */}
                {arrowGroup}
              </g>
            );
          })}

        {/* Highlight overlay: Sudut */}
        {highlightMode === "sudut" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const prevIdx =
              (i - 1 + scaledVertices.length) % scaledVertices.length;
            const nextIdx = (i + 1) % scaledVertices.length;
            const prev = scaledVertices[prevIdx];
            const next = scaledVertices[nextIdx];
            const angleHighlight = highlightedAngles.find(
              (a) => a.index === i,
            );
            const isHighlighted = !!angleHighlight;
            const isRightAngle = props.rightAngleIndices.includes(i);
            const isNextAngle = i === nextAngleIndex;

            let arrowGroup = null;
            if (isNextAngle) {
              const d1x = prev.x - v.x;
              const d1y = prev.y - v.y;
              const d2x = next.x - v.x;
              const d2y = next.y - v.y;
              const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
              const len2 = Math.sqrt(d2x * d2x + d2y * d2y);
              
              if (len1 > 0 && len2 > 0) {
                const n1x = d1x / len1;
                const n1y = d1y / len1;
                const n2x = d2x / len2;
                const n2y = d2y / len2;
                const bx = n1x + n2x;
                const by = n1y + n2y;
                const bLen = Math.sqrt(bx * bx + by * by);
                
                if (bLen > 0) {
                  const arrowX = v.x + (bx / bLen) * 35;
                  const arrowY = v.y + (by / bLen) * 35;
                  // point towards vertex
                  const angle = Math.atan2(-by, -bx) * (180 / Math.PI);
                  
                  arrowGroup = (
                    <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="-4,0; 4,0; -4,0" dur="1s" repeatCount="indefinite" />
                        <path d="M-12,-8 L4,0 L-12,8 L-6,0 Z" fill="var(--geo-angle)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                      </g>
                    </g>
                  );
                }
              }
            }

            return (
              <g key={`angle-${i}`}>
                {isHighlighted &&
                  (isRightAngle ? (
                    <RightAngleMarker vertex={v} p1={prev} p2={next} />
                  ) : (
                    <ArcMarker
                      vertex={v}
                      p1={prev}
                      p2={next}
                      color={angleHighlight?.color ?? ANGLE_COLOR}
                    />
                  ))}
                {/* Invisible hit area for angle */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={16}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onAngleClick?.(i)}
                  role="button"
                  aria-label={`Sudut ${i + 1}: ${Math.round(props.angles[i])}°`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onAngleClick?.(i);
                    }
                  }}
                />
                {/* Angle label */}
                {isHighlighted && (
                  <AngleLabel
                    vertex={v}
                    p1={prev}
                    p2={next}
                    angle={props.angles[i]}
                    rotation={shape.rotation}
                  />
                )}
                {/* Next Angle Arrow */}
                {arrowGroup}
              </g>
            );
          })}

        {/* Highlight overlay: Titik sudut */}
        {highlightMode === "titik-sudut" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const vertexHighlight = highlightedVertices.find(
              (vh) => vh.index === i,
            );
            const isCounted = !!vertexHighlight;
            const isNextVertex = i === nextVertexIndex;

            let arrowGroup = null;
            if (isNextVertex) {
              const dx = v.x - CANVAS_CENTER;
              const dy = v.y - CANVAS_CENTER;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = len === 0 ? 0 : dx / len;
              const ny = len === 0 ? 0 : dy / len;
              
              const arrowX = v.x + nx * 32;
              const arrowY = v.y + ny * 32;
              // Point towards vertex
              const angle = Math.atan2(-ny, -nx) * (180 / Math.PI);
              
              arrowGroup = (
                <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="-4,0; 4,0; -4,0" dur="1s" repeatCount="indefinite" />
                    <path d="M-12,-8 L4,0 L-12,8 L-6,0 Z" fill="var(--geo-vertex)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  </g>
                </g>
              );
            }

            return (
              <g key={`vertex-${i}`}>
                {/* Visual marker titik sudut */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={isCounted ? 8 : 5}
                  fill={isCounted ? VERTEX_COLOR : "#CBD5E1"}
                  stroke={isCounted ? "white" : "#94A3B8"}
                  strokeWidth={isCounted ? 2.5 : 1.5}
                  style={{
                    transition: "all 200ms ease-out",
                    filter: isCounted
                      ? "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.45))"
                      : "none",
                  }}
                />

                {/* Titik pusat aksen ketika sudah dihitung */}
                {isCounted && (
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r={3}
                    fill="white"
                  />
                )}

                {/* Label Titik Sudut (A, B, C, ...) */}
                {isCounted && (
                  <VertexLabel
                    vertex={v}
                    index={i}
                    rotation={shape.rotation}
                  />
                )}

                {/* Hit area luas agar mudah disentuh pada layar sentuh/mouse */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={18}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onVertexClick?.(i)}
                  role="button"
                  aria-label={`Titik Sudut ${i + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onVertexClick?.(i);
                    }
                  }}
                />
                {/* Next Vertex Arrow */}
                {arrowGroup}
              </g>
            );
          })}

        {/* Characteristic highlight: sisi sama panjang */}
        {activeCharacteristic === "equalSides" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const next = scaledVertices[(i + 1) % scaledVertices.length];
            return (
              <g key={`char-side-${i}`}>
                <line
                  x1={v.x}
                  y1={v.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={SIDE_COLOR}
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={0.7}
                />
                <TickMark p1={v} p2={next} counted />
              </g>
            );
          })}

        {/* Characteristic highlight: sudut siku-siku */}
        {activeCharacteristic === "rightAngle" &&
          !isCircle &&
          props.rightAngleIndices.map((i) => {
            const v = scaledVertices[i];
            const prevIdx =
              (i - 1 + scaledVertices.length) % scaledVertices.length;
            const nextIdx = (i + 1) % scaledVertices.length;
            return (
              <RightAngleMarker
                key={`char-ra-${i}`}
                vertex={v}
                p1={scaledVertices[prevIdx]}
                p2={scaledVertices[nextIdx]}
              />
            );
          })}

        {/* Characteristic highlight: jumlah sisi */}
        {activeCharacteristic === "sideCount" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const next = scaledVertices[(i + 1) % scaledVertices.length];
            
            const mx = (v.x + next.x) / 2;
            const my = (v.y + next.y) / 2;
            const dx = next.x - v.x;
            const dy = next.y - v.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            let arrowGroup = null;
            
            if (len > 0) {
              const nx = -dy / len;
              const ny = dx / len;
              const cx = mx - CANVAS_CENTER;
              const cy = my - CANVAS_CENTER;
              const dot = nx * cx + ny * cy;
              const isOutward = dot > 0;
              const outNx = isOutward ? nx : -nx;
              const outNy = isOutward ? ny : -ny;
              const inNx = -outNx;
              const inNy = -outNy;
              const arrowX = mx + outNx * 32;
              const arrowY = my + outNy * 32;
              const angle = Math.atan2(inNy, inNx) * (180 / Math.PI);
              
              arrowGroup = (
                <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="-4,0; 4,0; -4,0" dur="1s" repeatCount="indefinite" />
                    <path d="M-12,-8 L4,0 L-12,8 L-6,0 Z" fill="var(--geo-side)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  </g>
                </g>
              );
            }

            return (
              <g key={`char-count-${i}`}>
                <line
                  x1={v.x}
                  y1={v.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={SIDE_COLOR}
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={0.7}
                />
                {arrowGroup}
              </g>
            );
          })}

        {/* Characteristic highlight: jumlah sudut */}
        {activeCharacteristic === "angleCount" &&
          !isCircle &&
          scaledVertices.map((v, i) => {
            const prevIdx =
              (i - 1 + scaledVertices.length) % scaledVertices.length;
            const nextIdx = (i + 1) % scaledVertices.length;
            const prev = scaledVertices[prevIdx];
            const next = scaledVertices[nextIdx];
            const isRight = props.rightAngleIndices.includes(i);
            
            let arrowGroup = null;
            const d1x = prev.x - v.x;
            const d1y = prev.y - v.y;
            const d2x = next.x - v.x;
            const d2y = next.y - v.y;
            const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
            const len2 = Math.sqrt(d2x * d2x + d2y * d2y);
            
            if (len1 > 0 && len2 > 0) {
              const n1x = d1x / len1;
              const n1y = d1y / len1;
              const n2x = d2x / len2;
              const n2y = d2y / len2;
              const bx = n1x + n2x;
              const by = n1y + n2y;
              const bLen = Math.sqrt(bx * bx + by * by);
              
              if (bLen > 0) {
                const arrowX = v.x + (bx / bLen) * 35;
                const arrowY = v.y + (by / bLen) * 35;
                const angle = Math.atan2(-by, -bx) * (180 / Math.PI);
                
                arrowGroup = (
                  <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angle})`}>
                    <g>
                      <animateTransform attributeName="transform" type="translate" values="-4,0; 4,0; -4,0" dur="1s" repeatCount="indefinite" />
                      <path d="M-12,-8 L4,0 L-12,8 L-6,0 Z" fill="var(--geo-angle)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    </g>
                  </g>
                );
              }
            }

            return (
              <g key={`char-ac-${i}`}>
                {isRight ? (
                  <RightAngleMarker
                    vertex={v}
                    p1={prev}
                    p2={next}
                  />
                ) : (
                  <ArcMarker
                    vertex={v}
                    p1={prev}
                    p2={next}
                    color={ANGLE_COLOR}
                  />
                )}
                {arrowGroup}
              </g>
            );
          })}

        {/* Lingkaran: radius/diameter highlight */}
        {isCircle && activeCharacteristic === "radius" && (
          <line
            x1={CANVAS_CENTER}
            y1={CANVAS_CENTER}
            x2={
              CANVAS_CENTER +
              (shape as LingkaranDef).params.r * SCALE_FACTOR
            }
            y2={CANVAS_CENTER}
            stroke={SIDE_COLOR}
            strokeWidth={3}
            strokeDasharray="6 3"
            markerEnd="url(#arrowhead)"
          />
        )}
        {isCircle && activeCharacteristic === "diameter" && (
          <line
            x1={
              CANVAS_CENTER -
              (shape as LingkaranDef).params.r * SCALE_FACTOR
            }
            y1={CANVAS_CENTER}
            x2={
              CANVAS_CENTER +
              (shape as LingkaranDef).params.r * SCALE_FACTOR
            }
            y2={CANVAS_CENTER}
            stroke={SIDE_COLOR}
            strokeWidth={3}
            strokeDasharray="6 3"
          />
        )}
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill={SIDE_COLOR}
          />
        </marker>
      </defs>
    </svg>
  );
}

/* ================================================================== */
/*  Sub-components: Penanda Matematika                                 */
/* ================================================================== */

/** Tick mark di tengah sisi — penanda sisi sama panjang */
function TickMark({
  p1,
  p2,
  counted,
}: {
  p1: Point;
  p2: Point;
  counted: boolean;
}) {
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Perpendicular unit vector
  const nx = -dy / len;
  const ny = dx / len;

  return (
    <line
      x1={mx + nx * TICK_SIZE}
      y1={my + ny * TICK_SIZE}
      x2={mx - nx * TICK_SIZE}
      y2={my - ny * TICK_SIZE}
      stroke={counted ? SIDE_COLOR : "#94A3B8"}
      strokeWidth={2.5}
      strokeLinecap="round"
      opacity={counted ? 1 : 0.5}
    />
  );
}

/** Busur sudut (untuk sudut non-siku-siku) */
function ArcMarker({
  vertex,
  p1,
  p2,
  color,
}: {
  vertex: Point;
  p1: Point;
  p2: Point;
  color: string;
}) {
  const d1x = p1.x - vertex.x;
  const d1y = p1.y - vertex.y;
  const d2x = p2.x - vertex.x;
  const d2y = p2.y - vertex.y;

  const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
  const len2 = Math.sqrt(d2x * d2x + d2y * d2y);

  if (len1 === 0 || len2 === 0) return null;

  const n1x = (d1x / len1) * ARC_RADIUS;
  const n1y = (d1y / len1) * ARC_RADIUS;
  const n2x = (d2x / len2) * ARC_RADIUS;
  const n2y = (d2y / len2) * ARC_RADIUS;

  const startX = vertex.x + n1x;
  const startY = vertex.y + n1y;
  const endX = vertex.x + n2x;
  const endY = vertex.y + n2y;

  // Determine arc sweep direction
  const cross = n1x * n2y - n1y * n2x;
  const sweepFlag = cross > 0 ? 0 : 1;

  return (
    <path
      d={`M ${startX} ${startY} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 ${sweepFlag} ${endX} ${endY}`}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      opacity={0.8}
    />
  );
}

/** Kotak siku-siku (MATH-03) */
function RightAngleMarker({
  vertex,
  p1,
  p2,
}: {
  vertex: Point;
  p1: Point;
  p2: Point;
}) {
  const d1x = p1.x - vertex.x;
  const d1y = p1.y - vertex.y;
  const d2x = p2.x - vertex.x;
  const d2y = p2.y - vertex.y;

  const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
  const len2 = Math.sqrt(d2x * d2x + d2y * d2y);

  if (len1 === 0 || len2 === 0) return null;

  const n1x = (d1x / len1) * RIGHT_ANGLE_SIZE;
  const n1y = (d1y / len1) * RIGHT_ANGLE_SIZE;
  const n2x = (d2x / len2) * RIGHT_ANGLE_SIZE;
  const n2y = (d2y / len2) * RIGHT_ANGLE_SIZE;

  // 3 points of the right-angle box
  const a = { x: vertex.x + n1x, y: vertex.y + n1y };
  const b = { x: vertex.x + n1x + n2x, y: vertex.y + n1y + n2y };
  const c = { x: vertex.x + n2x, y: vertex.y + n2y };

  return (
    <path
      d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`}
      fill="none"
      stroke={ANGLE_COLOR}
      strokeWidth={2}
      strokeLinejoin="miter"
      opacity={0.8}
    />
  );
}

/** Label panjang sisi */
function SideLabel({
  p1,
  p2,
  length,
  rotation,
}: {
  p1: Point;
  p2: Point;
  length: number;
  rotation: number;
}) {
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Offset label perpendicular to side
  const nx = -dy / len;
  const ny = dx / len;
  const offset = 16;

  return (
    <text
      x={mx + nx * offset}
      y={my + ny * offset}
      textAnchor="middle"
      dominantBaseline="central"
      fill={SIDE_COLOR}
      fontSize={12}
      fontWeight={600}
      fontFamily="var(--font-sans), sans-serif"
      transform={`rotate(${-rotation} ${mx + nx * offset} ${my + ny * offset})`}
    >
      {length} cm
    </text>
  );
}

/** Label sudut */
function AngleLabel({
  vertex,
  p1,
  p2,
  angle,
  rotation,
}: {
  vertex: Point;
  p1: Point;
  p2: Point;
  angle: number;
  rotation: number;
}) {
  const d1x = p1.x - vertex.x;
  const d1y = p1.y - vertex.y;
  const d2x = p2.x - vertex.x;
  const d2y = p2.y - vertex.y;
  const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
  const len2 = Math.sqrt(d2x * d2x + d2y * d2y);

  if (len1 === 0 || len2 === 0) return null;

  // Bisector direction
  const n1x = d1x / len1;
  const n1y = d1y / len1;
  const n2x = d2x / len2;
  const n2y = d2y / len2;
  const bx = n1x + n2x;
  const by = n1y + n2y;
  const bLen = Math.sqrt(bx * bx + by * by);

  if (bLen === 0) return null;

  const offset = 30;
  const lx = vertex.x + (bx / bLen) * offset;
  const ly = vertex.y + (by / bLen) * offset;

  return (
    <text
      x={lx}
      y={ly}
      textAnchor="middle"
      dominantBaseline="central"
      fill={ANGLE_COLOR}
      fontSize={11}
      fontWeight={600}
      fontFamily="var(--font-sans), sans-serif"
      transform={`rotate(${-rotation} ${lx} ${ly})`}
    >
      {Math.round(angle)}°
    </text>
  );
}

/** Label badge titik sudut (A, B, C, D) */
function VertexLabel({
  vertex,
  index,
  rotation,
}: {
  vertex: Point;
  index: number;
  rotation: number;
}) {
  const dx = vertex.x - CANVAS_CENTER;
  const dy = vertex.y - CANVAS_CENTER;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = len === 0 ? 0 : dx / len;
  const ny = len === 0 ? 0 : dy / len;
  const offset = 20;
  const lx = vertex.x + nx * offset;
  const ly = vertex.y + ny * offset;

  const letter = String.fromCharCode(65 + index); // A, B, C, D...

  return (
    <g transform={`rotate(${-rotation} ${lx} ${ly})`}>
      <circle
        cx={lx}
        cy={ly}
        r={9}
        fill={VERTEX_COLOR}
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={10}
        fontWeight={700}
        fontFamily="var(--font-sans), sans-serif"
      >
        {letter}
      </text>
    </g>
  );
}
