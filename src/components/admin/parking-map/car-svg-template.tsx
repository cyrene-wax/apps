function Wheel({
  x,
  y,
  cx,
  cy,
  id,
}: {
  x: number;
  y: number;
  cx: number;
  cy: number;
  id: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={14} height={22} rx={5} fill={`url(#wh-${id})`} />
      <rect x={x + 1.5} y={y + 1.5} width={11} height={19} rx={4} fill="#111" />
      <circle cx={cx} cy={cy} r={6.5} fill={`url(#wh-${id})`} />
      <circle cx={cx} cy={cy} r={4.5} fill={`url(#hu-${id})`} />
      <circle cx={cx} cy={cy} r={2} fill="#555" />
      <line
        x1={cx}
        y1={cy - 4}
        x2={cx}
        y2={cy + 4}
        stroke="#888"
        strokeWidth={1}
      />
      <line
        x1={cx - 4}
        y1={cy}
        x2={cx + 4}
        y2={cy}
        stroke="#888"
        strokeWidth={1}
      />
      <line
        x1={cx - 2.8}
        y1={cy - 2.8}
        x2={cx + 2.8}
        y2={cy + 2.8}
        stroke="#888"
        strokeWidth={1}
      />
      <line
        x1={cx + 2.8}
        y1={cy - 2.8}
        x2={cx - 2.8}
        y2={cy + 2.8}
        stroke="#888"
        strokeWidth={1}
      />
    </g>
  );
}

type CarColor = {
  body: string;
  shine: string;
  detail: string;
};

function TopDownCar({ color, style = 0 }: { color: CarColor; style?: number }) {
  const id = color.body.replace('#', '') + style;

  const windFill = `url(#wd-${id})`;

  return (
    <svg
      width="80"
      height="150"
      viewBox="0 0 80 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`bd-${id}`} cx="45%" cy="38%" r="62%">
          <stop offset="0%" stopColor={color.shine} />
          <stop offset="55%" stopColor={color.body} />
          <stop offset="100%" stopColor={color.detail} />
        </radialGradient>
        <radialGradient id={`rf-${id}`} cx="45%" cy="35%" r="58%">
          <stop offset="0%" stopColor={color.shine} />
          <stop offset="100%" stopColor={color.body} />
        </radialGradient>
        <linearGradient id={`wd-${id}`} x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#c8e8ff" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#6ab4ee" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1a5fa0" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id={`rg-${id}`} x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#3a7abf" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#0d2a50" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`wh-${id}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="45%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#030712" />
        </radialGradient>
        <radialGradient id={`hu-${id}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#6b7280" />
        </radialGradient>
        <filter id={`sh-${id}`}>
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="rgba(0,0,0,0.4)"
          />
        </filter>
      </defs>

      <ellipse cx="40" cy="144" rx="27" ry="5" fill="rgba(0,0,0,0.28)" />

      {style === 0 && (
        <>
          <path
            d="M16 38 L17 18 Q18 6 26 5 L54 5 Q62 6 63 18 L64 38 Q66 50 64 62 L64 118 Q64 128 56 130 L52 132 L52 136 Q52 140 40 140 Q28 140 28 136 L28 132 L24 130 Q16 128 16 118 L16 62 Q14 50 16 38 Z"
            fill={`url(#bd-${id})`}
            filter={`url(#sh-${id})`}
          />
          <path
            d="M16 38 Q15 50 15 62 L15 118 Q15 126 21 129 L24 130 Q16 128 16 118 L16 62 Q14 50 16 38 Z"
            fill="rgba(255,255,255,0.13)"
          />
          <path
            d="M22 58 L23 34 Q24 20 28 18 L52 18 Q56 20 57 34 L58 58 L58 108 Q58 114 54 116 L26 116 Q22 114 22 108 Z"
            fill={`url(#rf-${id})`}
          />
          <path
            d="M30 8 Q40 5 50 8 Q48 15 40 16 Q32 15 30 8 Z"
            fill="rgba(255,255,255,0.3)"
          />
          <line
            x1="26"
            y1="22"
            x2="54"
            y2="22"
            stroke="rgba(0,0,0,0.28)"
            strokeWidth="1.2"
          />
          <line
            x1="26"
            y1="26"
            x2="54"
            y2="26"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="0.8"
          />
          <line
            x1="26"
            y1="30"
            x2="54"
            y2="30"
            stroke="rgba(0,0,0,0.13)"
            strokeWidth="0.6"
          />
          <path
            d="M24 34 L24 56 Q24 60 27 61 L53 61 Q56 60 56 56 L56 34 Q56 30 53 29 L27 29 Q24 30 24 34 Z"
            fill={windFill}
          />
          <path
            d="M27 30 L30 61"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="59"
            x2="52"
            y2="53"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M25 78 L25 106 Q25 111 28 112 L52 112 Q55 111 55 106 L55 78 Q55 74 52 73 L28 73 Q25 74 25 78 Z"
            fill={`url(#rg-${id})`}
          />
          <line
            x1="40"
            y1="5"
            x2="40"
            y2="29"
            stroke="rgba(255,255,255,0.17)"
            strokeWidth="1.5"
          />
          <path
            d="M22 6 Q40 2 58 6 L60 14 Q40 9 20 14 Z"
            fill={color.detail}
            opacity="0.95"
          />
          <path d="M19 5 L27 5 L27 10 L19 9 Z" fill="#fffde0" opacity="0.98" />
          <path d="M53 5 L61 5 L61 9 L53 10 Z" fill="#fffde0" opacity="0.98" />
          <ellipse
            cx="23"
            cy="7.5"
            rx="2.5"
            ry="2"
            fill="rgba(255,245,120,0.65)"
          />
          <ellipse
            cx="57"
            cy="7.5"
            rx="2.5"
            ry="2"
            fill="rgba(255,245,120,0.65)"
          />
          <rect
            x="22"
            y="12"
            width="36"
            height="4"
            rx="1.5"
            fill="rgba(0,0,0,0.35)"
          />
          <line
            x1="28"
            y1="13"
            x2="52"
            y2="13"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
          />
          <line
            x1="28"
            y1="15"
            x2="52"
            y2="15"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="0.8"
          />
          <path
            d="M22 130 Q40 134 58 130 L60 123 Q40 128 20 123 Z"
            fill={color.detail}
            opacity="0.95"
          />
          <path
            d="M19 124 L27 124 L27 130 L19 129 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <path
            d="M53 124 L61 124 L61 129 L53 130 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <ellipse
            cx="23"
            cy="127"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <ellipse
            cx="57"
            cy="127"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <rect
            x="22"
            y="119"
            width="36"
            height="4"
            rx="1.5"
            fill="rgba(0,0,0,0.35)"
          />
          <path
            d="M13 50 Q11 53 11 58 L15 59 L16 52 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <path
            d="M67 50 Q69 53 69 58 L65 59 L64 52 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <line
            x1="16"
            y1="72"
            x2="64"
            y2="72"
            stroke="rgba(0,0,0,0.26)"
            strokeWidth="1"
          />
          <rect
            x="14"
            y="76"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <rect
            x="61"
            y="76"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <Wheel x={4} y={42} cx={11} cy={53} id={id} />
          <Wheel x={62} y={42} cx={69} cy={53} id={id} />
          <Wheel x={4} y={96} cx={11} cy={107} id={id} />
          <Wheel x={62} y={96} cx={69} cy={107} id={id} />
          <rect
            x="32"
            y="137"
            width="5"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
          <rect
            x="43"
            y="137"
            width="5"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
        </>
      )}

      {style === 1 && (
        <>
          <path
            d="M18 42 L20 22 Q21 8 30 7 L50 7 Q59 8 60 22 L62 42 Q64 54 60 64 L60 114 Q60 124 52 126 L50 128 L50 132 Q50 136 40 136 Q30 136 30 132 L30 128 L28 126 Q20 124 20 114 L20 64 Q16 54 18 42 Z"
            fill={`url(#bd-${id})`}
            filter={`url(#sh-${id})`}
          />
          <path
            d="M18 42 Q17 54 17 64 L17 114 Q17 122 22 125 L28 126 Q20 124 20 114 L20 64 Q16 54 18 42 Z"
            fill="rgba(255,255,255,0.13)"
          />
          <path
            d="M24 60 L26 38 Q27 24 30 22 L50 22 Q53 24 54 38 L56 60 L56 104 Q56 110 52 112 L28 112 Q24 110 24 104 Z"
            fill={`url(#rf-${id})`}
          />
          <path
            d="M32 9 Q40 6 48 9 Q46 16 40 17 Q34 16 32 9 Z"
            fill="rgba(255,255,255,0.32)"
          />
          <path
            d="M26 38 L26 58 Q26 63 29 64 L51 64 Q54 63 54 58 L54 38 Q54 34 51 33 L29 33 Q26 34 26 38 Z"
            fill={windFill}
          />
          <path
            d="M29 34 L32 64"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="62"
            x2="50"
            y2="56"
            stroke="rgba(0,0,0,0.42)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M27 78 L27 104 Q27 109 30 110 L50 110 Q53 109 53 104 L53 78 Q53 74 50 73 L30 73 Q27 74 27 78 Z"
            fill={`url(#rg-${id})`}
          />
          <line
            x1="40"
            y1="7"
            x2="40"
            y2="33"
            stroke="rgba(255,255,255,0.17)"
            strokeWidth="1.5"
          />
          <path
            d="M29 10 L26 33"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.8"
          />
          <path d="M51 10 L54 33" stroke="rgba(0,0,0,0.11)" strokeWidth="0.8" />
          <path
            d="M24 8 Q40 3 56 8 L58 16 Q40 11 22 16 Z"
            fill={color.detail}
            opacity="0.92"
          />
          <path d="M21 7 L29 7 L29 12 L21 11 Z" fill="#fffde0" opacity="0.98" />
          <path d="M51 7 L59 7 L59 11 L51 12 Z" fill="#fffde0" opacity="0.98" />
          <ellipse
            cx="25"
            cy="9.5"
            rx="2.5"
            ry="2"
            fill="rgba(255,245,120,0.65)"
          />
          <ellipse
            cx="55"
            cy="9.5"
            rx="2.5"
            ry="2"
            fill="rgba(255,245,120,0.65)"
          />
          <rect
            x="24"
            y="14"
            width="32"
            height="3.5"
            rx="1.5"
            fill="rgba(0,0,0,0.3)"
          />
          <path
            d="M24 126 Q40 131 56 126 L58 119 Q40 124 22 119 Z"
            fill={color.detail}
            opacity="0.92"
          />
          <path
            d="M21 120 L29 120 L29 126 L21 125 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <path
            d="M51 120 L59 120 L59 125 L51 126 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <ellipse
            cx="25"
            cy="123"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <ellipse
            cx="55"
            cy="123"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <rect
            x="24"
            y="116"
            width="32"
            height="3.5"
            rx="1.5"
            fill="rgba(0,0,0,0.3)"
          />
          <path
            d="M15 52 Q13 55 13 60 L17 61 L18 54 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <path
            d="M65 52 Q67 55 67 60 L63 61 L62 54 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <line
            x1="20"
            y1="74"
            x2="60"
            y2="74"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1"
          />
          <rect
            x="16"
            y="78"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <rect
            x="59"
            y="78"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <Wheel x={5} y={46} cx={12} cy={57} id={id} />
          <Wheel x={61} y={46} cx={68} cy={57} id={id} />
          <Wheel x={5} y={98} cx={12} cy={109} id={id} />
          <Wheel x={61} y={98} cx={68} cy={109} id={id} />
          <rect
            x="33"
            y="133"
            width="5"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
          <rect
            x="42"
            y="133"
            width="5"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
        </>
      )}

      {style === 2 && (
        <>
          <path
            d="M19 48 L22 24 Q24 8 32 7 L48 7 Q56 8 58 24 L61 48 Q63 60 60 70 L60 114 Q60 124 52 126 L50 128 L50 132 Q50 136 40 136 Q30 136 30 132 L30 128 L28 126 Q20 124 20 114 L20 70 Q17 60 19 48 Z"
            fill={`url(#bd-${id})`}
            filter={`url(#sh-${id})`}
          />
          <path
            d="M19 48 Q18 60 18 70 L18 114 Q18 122 23 125 L28 126 Q20 124 20 114 L20 70 Q17 60 19 48 Z"
            fill="rgba(255,255,255,0.13)"
          />
          <path
            d="M25 66 L27 44 Q28 30 32 28 L48 28 Q52 30 53 44 L55 66 L55 104 Q55 110 51 112 L29 112 Q25 110 25 104 Z"
            fill={`url(#rf-${id})`}
          />
          <path
            d="M33 9 Q40 6 47 9 Q45 16 40 17 Q35 16 33 9 Z"
            fill="rgba(255,255,255,0.32)"
          />
          <rect
            x="34"
            y="20"
            width="12"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.25)"
          />
          <rect
            x="34"
            y="24"
            width="12"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.18)"
          />
          <line
            x1="40"
            y1="7"
            x2="40"
            y2="39"
            stroke="rgba(255,255,255,0.17)"
            strokeWidth="1.5"
          />
          <path
            d="M27 44 L27 64 Q27 69 30 70 L50 70 Q53 69 53 64 L53 44 Q53 40 50 39 L30 39 Q27 40 27 44 Z"
            fill={windFill}
          />
          <path
            d="M30 40 L33 70"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="31"
            y1="68"
            x2="51"
            y2="62"
            stroke="rgba(0,0,0,0.42)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M27 82 L27 104 Q27 109 30 110 L50 110 Q53 109 53 104 L53 82 Q53 78 50 77 L30 77 Q27 78 27 82 Z"
            fill={`url(#rg-${id})`}
          />
          <path
            d="M22 8 Q40 3 58 8 L60 17 Q40 11 20 17 Z"
            fill={color.detail}
            opacity="0.95"
          />
          <path d="M20 7 L28 7 L28 12 L20 11 Z" fill="#fffde0" opacity="0.98" />
          <path d="M52 7 L60 7 L60 11 L52 12 Z" fill="#fffde0" opacity="0.98" />
          <ellipse
            cx="24"
            cy="9.5"
            rx="2.8"
            ry="2.2"
            fill="rgba(255,245,120,0.65)"
          />
          <ellipse
            cx="56"
            cy="9.5"
            rx="2.8"
            ry="2.2"
            fill="rgba(255,245,120,0.65)"
          />
          <rect
            x="24"
            y="15"
            width="32"
            height="3"
            rx="1.5"
            fill="rgba(0,0,0,0.35)"
          />
          <rect
            x="20"
            y="17"
            width="40"
            height="2.5"
            rx="1"
            fill="rgba(0,0,0,0.45)"
          />
          <path
            d="M22 126 Q40 131 58 126 L60 119 Q40 124 20 119 Z"
            fill={color.detail}
            opacity="0.95"
          />
          <path
            d="M20 120 L28 120 L28 126 L20 125 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <path
            d="M52 120 L60 120 L60 125 L52 126 Z"
            fill="#dc2626"
            opacity="0.95"
          />
          <ellipse
            cx="24"
            cy="123"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <ellipse
            cx="56"
            cy="123"
            rx="2.5"
            ry="2"
            fill="rgba(255,80,80,0.5)"
          />
          <rect
            x="28"
            y="116"
            width="24"
            height="3"
            rx="1"
            fill="rgba(0,0,0,0.4)"
          />
          <line
            x1="34"
            y1="117"
            x2="34"
            y2="119"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
          />
          <line
            x1="40"
            y1="117"
            x2="40"
            y2="119"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
          />
          <line
            x1="46"
            y1="117"
            x2="46"
            y2="119"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.8"
          />
          <path
            d="M16 58 Q14 61 14 66 L18 67 L19 60 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <path
            d="M64 58 Q66 61 66 66 L62 67 L61 60 Z"
            fill={color.body}
            stroke={color.detail}
            strokeWidth="0.6"
          />
          <line
            x1="20"
            y1="78"
            x2="60"
            y2="78"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1"
          />
          <rect
            x="16"
            y="82"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <rect
            x="59"
            y="82"
            width="5"
            height="2.5"
            rx="1.2"
            fill="rgba(220,220,220,0.5)"
          />
          <Wheel x={5} y={52} cx={12} cy={63} id={id} />
          <Wheel x={61} y={52} cx={68} cy={63} id={id} />
          <Wheel x={5} y={98} cx={12} cy={109} id={id} />
          <Wheel x={61} y={98} cx={68} cy={109} id={id} />
          <rect
            x="30"
            y="133"
            width="6"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
          <rect
            x="44"
            y="133"
            width="6"
            height="4"
            rx="2"
            fill="#374151"
            stroke="#111"
            strokeWidth="0.6"
          />
          <ellipse cx="33" cy="133" rx="3" ry="1.5" fill="#1f2937" />
          <ellipse cx="47" cy="133" rx="3" ry="1.5" fill="#1f2937" />
        </>
      )}
    </svg>
  );
}

export { TopDownCar };
