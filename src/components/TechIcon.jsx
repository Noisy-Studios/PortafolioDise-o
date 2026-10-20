import React from "react";
import { 
  Code2, 
  Cpu, 
  Layers, 
  Palette, 
  Music2, 
  GitBranch, 
  Sparkles, 
  Gamepad2, 
  Wrench, 
  Box
} from "lucide-react";

export function TechIcon({ name, className = "w-6 h-6" }) {
  const iconKey = name ? name.toLowerCase() : "";

  if (iconKey.includes("unity")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm0 2.3l6.5 3.8v7.6L12 19.5 5.5 15.7V8.1L12 4.3zm-1 3.7v4.5l-3.9 2.2-.9-1.5 3-1.7V9.5h1.8zm3.6 5.2l-3.6-2V8h1.8v2.2l3 1.7-.9 1.5l-.3-.2zM12 14.8l3-1.7.9 1.5-3.9 2.2V12.3h-1.8v2.5z" />
      </svg>
    );
  }

  if (iconKey.includes("unreal")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5 0 2.2 1.1 4.1 2.8 5.2.4-.6.8-1.4 1.2-2.1-.6-.5-1-1.3-1-2.2 0-1.7 1.3-3 3-3s3 1.3 3 3c0 .9-.4 1.7-1 2.2.4.7.8 1.5 1.2 2.1 1.7-1.1 2.8-3 2.8-5.2 0-3.6-2.9-6.5-6.5-6.5z" />
      </svg>
    );
  }

  if (iconKey.includes("c#") || iconKey.includes("csharp")) {
    return <Code2 className={className} />;
  }

  if (iconKey.includes("blender")) {
    return <Box className={className} />;
  }

  if (iconKey.includes("aseprite")) {
    return <Palette className={className} />;
  }

  if (iconKey.includes("fmod") || iconKey.includes("audio")) {
    return <Music2 className={className} />;
  }

  if (iconKey.includes("git")) {
    return <GitBranch className={className} />;
  }

  if (iconKey.includes("shader")) {
    return <Sparkles className={className} />;
  }

  if (iconKey.includes("steam")) {
    return <Gamepad2 className={className} />;
  }

  if (iconKey.includes("util") || iconKey.includes("tool")) {
    return <Wrench className={className} />;
  }

  return <Cpu className={className} />;
}

export default TechIcon;
