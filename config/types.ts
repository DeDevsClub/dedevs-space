type NavDocument = {
  name: string;
  url: string;
  icon: React.ReactNode
};

type NavMainItem = {
  title: string;
  url: string;
  icon: React.ReactNode
};

type NavSecondaryItem = {
  title: string;
  url: string;
  icon: React.ReactNode
};

interface Dapp {
  slug: string;
  title: string;
  url: string;
  description?: string; 
}

export type { NavDocument, NavMainItem, NavSecondaryItem, Dapp };