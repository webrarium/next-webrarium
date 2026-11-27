import styles from "./PupaIcon.module.css";

/**
 * Webrarium mark: Pupa the cat peeking over the edge, with her two different eyes
 * (green = brand colour, blue = as in real life). `animated` makes the eyes blink in turn.
 */
export default function PupaIcon({
  size = 32,
  animated = false,
  bigEyes = false,
  title,
}: {
  size?: number;
  /** "lively" blinks more often and looks around (for large placements) */
  animated?: boolean | "lively";
  bigEyes?: boolean;
  title?: string;
}) {
  const r = bigEyes ? 4.6 : 3.3;
  const cy = bigEyes ? 41.5 : 42.81;
  const pr = bigEyes ? [1.45, 3.6] : [1.06, 2.64];
  const cls = animated === "lively" ? `${styles.animated} ${styles.lively}` : animated ? styles.animated : undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cls}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <rect width="64" height="64" rx="16" fill="#507A49" />
      <g transform="translate(7 12) scale(.78)">
        <path
          d="M10 47V31c0-3.3 1-6.4 2.6-9l.5-9.6c.1-1.7 2.1-2.5 3.4-1.4l8.2 7.1c4.8-1.6 9.8-1.6 14.6 0l8.2-7.1c1.3-1.1 3.3-.3 3.4 1.4l.5 9.6c1.6 2.6 2.6 5.7 2.6 9v16z"
          fill="#fff"
        />
      </g>
      <g className={styles.eyeL}>
        <circle cx="25.72" cy={cy} r={r} fill="#3d6b35" />
        <ellipse className={styles.pupil} cx="25.72" cy={cy} rx={pr[0]} ry={pr[1]} fill="#1d3019" />
      </g>
      <g className={styles.eyeR}>
        <circle cx="38.2" cy={cy} r={r} fill="#6FA8DC" />
        <ellipse className={styles.pupil} cx="38.2" cy={cy} rx={pr[0]} ry={pr[1]} fill="#1d3019" />
      </g>
      <path d="M11 48h42" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
