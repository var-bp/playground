import React from 'react';
import Svg, {Path} from 'react-native-svg';

// https://svg2jsx.com/

const renderIcon = (
  name: string,
  width: number,
  height: number,
  color: string,
) => {
  switch (name) {
    case 'user':
      return (
        <Svg fill={color} width={width} height={height} viewBox="0 0 512 512">
          <Path d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zm0 240c-57.897 0-105-47.103-105-105S198.103 30 256 30s105 47.103 105 105-47.103 105-105 105zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805zM61.66 482c7.515-85.086 78.351-152 164.34-152h60c85.989 0 156.825 66.914 164.34 152H61.66z" />
        </Svg>
      );
    case 'newspaper':
      return (
        <Svg fill={color} width={width} height={height} viewBox="0 0 512 512">
          <Path d="M497 180.75h-45.25V15c0-8.284-6.716-15-15-15H15C6.716 0 0 6.716 0 15v451.875C0 491.757 20.243 512 45.125 512h421.75C491.757 512 512 491.757 512 466.875V195.75c0-8.284-6.716-15-15-15zM30 466.875V30h391.75v436.875c0 5.304.927 10.394 2.616 15.125H45.125C36.785 482 30 475.215 30 466.875zm452 0c0 8.34-6.785 15.125-15.125 15.125s-15.125-6.785-15.125-15.125V210.75H482z" />
          <Path d="M376.5 60.25H75.25c-8.284 0-15 6.716-15 15v120.5c0 8.284 6.716 15 15 15H376.5c8.284 0 15-6.716 15-15V75.25c0-8.284-6.716-15-15-15zm-15 120.5H90.25v-90.5H361.5zM376.5 241H256c-8.284 0-15 6.716-15 15v120.5c0 8.284 6.716 15 15 15h120.5c8.284 0 15-6.716 15-15V256c0-8.284-6.716-15-15-15zm-15 120.5H271V271h90.5zM75.25 271h120.5c8.284 0 15-6.716 15-15s-6.716-15-15-15H75.25c-8.284 0-15 6.716-15 15s6.716 15 15 15zM75.25 331.25h120.5c8.284 0 15-6.716 15-15s-6.716-15-15-15H75.25c-8.284 0-15 6.716-15 15s6.716 15 15 15zM75.25 391.5h120.5c8.284 0 15-6.716 15-15s-6.716-15-15-15H75.25c-8.284 0-15 6.716-15 15s6.716 15 15 15zM375.894 421.75H75.25c-8.284 0-15 6.716-15 15s6.716 15 15 15h300.644c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
        </Svg>
      );
    case 'home':
      return (
        <Svg fill={color} width={width} height={height} viewBox="0 0 512 512">
          <Path d="M503.401 228.884l-43.253-39.411V58.79c0-8.315-6.741-15.057-15.057-15.057H340.976c-8.315 0-15.057 6.741-15.057 15.057v8.374l-52.236-47.597c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.885c-8.076 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.689v209.721c0 8.315 6.741 15.057 15.057 15.057h125.913c8.315 0 15.057-6.741 15.057-15.057V356.931H293v127.337c0 8.315 6.741 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.056-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.945-10.19 1.277-21.53-6.801-28.891zm-69.436 15.549c-8.315 0-15.057 6.741-15.057 15.057v209.721h-95.793V341.874c0-8.315-6.742-15.057-15.057-15.057H203.942c-8.315 0-15.057 6.741-15.057 15.057v127.337h-95.8V259.49c0-8.315-6.741-15.057-15.057-15.057H36.245l219.756-200.24 74.836 68.191a15.061 15.061 0 0016.224 2.644 15.06 15.06 0 008.973-13.774V73.847h74.002v122.276c0 4.237 1.784 8.276 4.916 11.13l40.803 37.18h-41.79z" />
        </Svg>
      );
    case 'location':
      return (
        <Svg fill={color} width={width} height={height} viewBox="0 0 512 512">
          <Path d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 00-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0025.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z" />
          <Path d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z" />
        </Svg>
      );
    default:
      return null;
  }
};

interface IconProps {
  name: string;
  width: number;
  height: number;
  color: string;
  backgroundColor?: string;
}

const Icon = ({name, width, height, color}: IconProps): JSX.Element | null => {
  return renderIcon(name, width, height, color);
};

export default React.memo(Icon);
