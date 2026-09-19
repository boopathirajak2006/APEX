import React from 'react'
import {
  MessageSquare,
  Users,
  Award,
  Brain,
  CheckCircle2,
  Clock,
  Presentation,
  Briefcase,
  Sparkles,
  BookOpen,
  Layers,
  ShieldCheck,
  Target,
  TrendingUp,
  Lightbulb,
  Check
} from 'lucide-react'

interface SoftSkillIconProps {
  name: string
  className?: string
  size?: number | string
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number | string }>> = {
  MessageSquare,
  messagesquare: MessageSquare,
  communication: MessageSquare,

  Users,
  users: Users,
  teamwork: Users,

  Award,
  award: Award,
  leadership: Award,

  Brain,
  brain: Brain,
  problem_solving: Brain,
  'problem-solving': Brain,

  CheckCircle2,
  checkcircle2: CheckCircle2,
  critical_thinking: CheckCircle2,
  'critical-thinking': CheckCircle2,

  Clock,
  clock: Clock,
  time_management: Clock,
  'time-management': Clock,

  Presentation,
  presentation: Presentation,
  presentation_skills: Presentation,
  'presentation-skills': Presentation,

  Briefcase,
  briefcase: Briefcase,
  interview_skills: Briefcase,
  'interview-skills': Briefcase,

  Sparkles,
  sparkles: Sparkles,
  adaptability: Sparkles,

  BookOpen,
  bookopen: BookOpen,
  Layers,
  layers: Layers,
  ShieldCheck,
  shieldcheck: ShieldCheck,
  Target,
  target: Target,
  TrendingUp,
  trendingup: TrendingUp,
  Lightbulb,
  lightbulb: Lightbulb,
  Check,
  check: Check
}

export const SoftSkillIcon: React.FC<SoftSkillIconProps> = ({
  name,
  className = 'w-5 h-5',
  size
}) => {
  if (!name) {
    return <Sparkles className={className} size={size} />
  }

  const normalized = name.trim()
  const IconComponent = ICON_MAP[normalized] || ICON_MAP[normalized.toLowerCase()] || Sparkles

  return <IconComponent className={className} size={size} />
}

export default SoftSkillIcon
