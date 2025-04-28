export interface NavigationItem {
  translateKey?: string;
  name?: string;
  link?: string;
  iconType?: string;
  iconClass?: string;
  iconLink?: string;
  children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    translateKey: "navigation.knowledge",
    iconClass: "fa fa-book",
    link: '/knowledge'
  },{
    translateKey: "navigation.task",
    iconClass: "fa fa-briefcase",
    link: '/task'
  },{
    translateKey: "navigation.brandVoice",
    iconClass: "fa fa-microphone",
    link: '/brand-voice'
  },{
    translateKey: "navigation.agentTemplate",
    iconClass: "fa fa-users",
    link: '/agent-template'
  },{
    translateKey: "navigation.settings",
    iconClass: "fa fa-cog",
    link: '/settings'
  },
]
