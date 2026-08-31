export interface DocsSection {
  id: string;
  numeral: string;
  title: string;
  shortTitle: string;
  description: string;
}

export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: "introduction",
    numeral: "01",
    title: "Introduction",
    shortTitle: "Introduction",
    description: "Welcome to HoodBear — a place to belong in HoodBear.",
  },
  {
    id: "collection",
    numeral: "02",
    title: "Collection",
    shortTitle: "Collection",
    description:
      "Verified specifications for the 5,555 hand-drawn pixel bear collection.",
  },
  {
    id: "how-the-mint-works",
    numeral: "03",
    title: "How the Mint Works",
    shortTitle: "Mint Structure",
    description:
      "Transparent breakdown of Team, Bearlist, and Public mint allocations.",
  },
  {
    id: "allowlist",
    numeral: "04",
    title: "Bearlist",
    shortTitle: "Bearlist",
    description:
      "Details for the 4,000 guaranteed free mint allocation and claim flow.",
  },
  {
    id: "public-mint",
    numeral: "05",
    title: "Public Mint",
    shortTitle: "Public Mint",
    description: "Public phase allocation, price, and chain details.",
  },
  {
    id: "holder-benefits",
    numeral: "06",
    title: "Holder Benefits",
    shortTitle: "Holder Benefits",
    description:
      "Exclusive snapshot rewards and the upcoming Mutant Bear 2nd collection airdrop.",
  },
];

export const COLLECTION_DATA = {
  name: "HoodBear",
  tagline: "A place to belong.",
  supply: "5,555",
  artworkType: "Hand-Drawn Pixel Art",
  chain: "Robinhood",
  summary:
    "HoodBear is a 5,555-piece generative collection of pixel bears, built around collecting, identity, and finding your place in the hood. Every bear is assembled from a library of hand-drawn traits, combined to create thousands of one-of-a-kind combinations.",
  revealStatus: "Reveal",
  revealDescription: "Delayed — art reveals after minting closes",
};

export interface MintTier {
  id: string;
  numeral: string;
  name: string;
  amount: string;
  price: string;
  limit: string;
  details: string;
  isPrimary?: boolean;
}

export const MINT_TIERS: MintTier[] = [
  {
    id: "team",
    numeral: "01",
    name: "TEAM",
    amount: "55",
    price: "FREE",
    limit: "100",
    details: "Reserved for giveaways, community rewards & team engagement",
    isPrimary: false,
  },
  {
    id: "whitelist",
    numeral: "02",
    name: "BEARLIST",
    amount: "4000",
    price: "FREE",
    limit: "1 per wallet",
    details: "",
    isPrimary: true,
  },
  {
    id: "public",
    numeral: "03",
    name: "PUBLIC",
    amount: "1500",
    price: "0.0004 ETH",
    limit: "5 per wallet",
    details: "",
    isPrimary: false,
  },
];

export const ALLOWLIST_INFO = {
  supply: "4000",
  price: "FREE",
  limitPerWallet: "1 per wallet",
  description:
    "The HoodBear Bearlist guarantees access to mint 1 bear for free. Spots are allocated through community participation, team selection, and the official Bearlist claim flow.",
  applyUrl: "/apply",
};

export const PUBLIC_MINT_INFO = {
  supply: "1500",
  price: "0.0004 ETH",
  limitPerWallet: "5 per wallet",
  chain: "Robinhood",
  description:
    "The Public Mint opens after the Bearlist window concludes. Any remaining supply will be available to all participants at 0.0004 ETH.",
};

export const HOLDER_BENEFITS_INFO = {
  title: "Mutant Bear Airdrop",
  badge: "SECOND COLLECTION",
  description:
    "Holding Genesis HoodBears unlocks direct access to the future of the HoodBear ecosystem. All verified holders will be eligible to receive a free airdrop of the upcoming second collection: Mutant Bear.",
  ratio: "3 Genesis HoodBear = 1 Mutant Bear Airdrop eligibility",
};
