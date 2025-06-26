"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Code,
  Users,
  Globe,
  Mail,
  List,
  LayoutGrid,
  Linkedin,
} from "lucide-react";
import developers from "@/data/developers.json";
import clsx from "clsx";
import { ProfileCard } from "@/components/cards/profile-card";
import type { Portfolio } from "@/lib/types";
import { useRouter } from "next/navigation";

const SKILL_OPTIONS = Array.from(
  new Set(
    developers.flatMap(
      (dev: Portfolio) => dev.skills?.map((s: any) => s.name) || []
    )
  )
);
const LOCATION_OPTIONS = Array.from(
  new Set(developers.map((dev: Portfolio) => dev.location).filter(Boolean))
);
const INDUSTRY_OPTIONS = Array.from(
  new Set(developers.map((dev: Portfolio) => dev.industry).filter(Boolean))
);
const SORT_OPTIONS = [
  { label: "Name", value: "name" },
  { label: "Location", value: "location" },
  { label: "Skills", value: "skills" },
  { label: "Experience", value: "experience" },
];

const PAGE_SIZE = 6;

export default function PortfoliosPage() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("name");
  const [cardView, setCardView] = useState(true);
  const [page, setPage] = useState(1);

  // Filtering and Sorting
  const filtered = useMemo(() => {
    let result = developers as Portfolio[];
    if (selectedSkill) {
      result = result.filter((dev) =>
        dev.skills?.some((s: any) => s.name === selectedSkill)
      );
    }
    if (selectedLocation) {
      result = result.filter((dev) => dev.location === selectedLocation);
    }
    if (selectedIndustry) {
      result = result.filter((dev) => dev.industry === selectedIndustry);
    }
    if (search) {
      result = result.filter(
        (dev) =>
          dev.name.toLowerCase().includes(search.toLowerCase()) ||
          dev.username.toLowerCase().includes(search.toLowerCase()) ||
          dev.skills?.some((s: any) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          ) ||
          dev.bio?.toLowerCase().includes(search.toLowerCase())
      );
    }
    switch (sortBy) {
      case "name":
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "location":
        result = result
          .slice()
          .sort((a, b) => (a.location || "").localeCompare(b.location || ""));
        break;
      case "skills":
        result = result
          .slice()
          .sort((a, b) => (b.skills?.length || 0) - (a.skills?.length || 0));
        break;
      case "experience":
        result = result
          .slice()
          .sort(
            (a, b) => (b.experience?.length || 0) - (a.experience?.length || 0)
          );
        break;
    }
    return result;
  }, [search, selectedSkill, selectedLocation, selectedIndustry, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters/search change
  function handleFilterChange(cb: () => void) {
    cb();
    setPage(1);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-indigo-950/60 py-10 px-2 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full border-t-1 py-3 border-x-2 border-b-4 border-neutral-800 rounded-md px-4">
          <div className="grid grid-cols-2 items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <div className="gradient-text text-2xl md:text-3xl font-extrabold">
              dedevs.space
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            <Input
              type="text"
              placeholder="Search names, skills, or terms ..."
              value={search}
              onChange={(e) =>
                handleFilterChange(() => setSearch(e.target.value))
              }
              className="flex w-full justify-center max-w-lg rounded-lg shadow"
            />
            <Button
              variant={cardView ? "default" : "outline"}
              size="icon"
              aria-label="Card view"
              className={clsx("ml-2", cardView && "bg-primary text-neutral-950")}
              onClick={() => setCardView(true)}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={!cardView ? "default" : "outline"}
              size="icon"
              aria-label="List view"
              className={clsx(!cardView && "bg-primary text-neutral-950")}
              onClick={() => setCardView(false)}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedSkill || ""}
            onChange={(e) =>
              handleFilterChange(() => setSelectedSkill(e.target.value || null))
            }
          >
            <option value="">All Skills</option>
            {SKILL_OPTIONS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedLocation || ""}
            onChange={(e) =>
              handleFilterChange(() =>
                setSelectedLocation(e.target.value || null)
              )
            }
          >
            <option value="">All Locations</option>
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedIndustry || ""}
            onChange={(e) =>
              handleFilterChange(() =>
                setSelectedIndustry(e.target.value || null)
              )
            }
          >
            <option value="">All Industries</option>
            {INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >{`Sort by ${opt.label}`}</option>
            ))}
          </select>
        </div>

        {/* Portfolio List */}
        <div
          className={clsx(
            cardView
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              : "flex flex-col gap-4"
          )}
        >
          {paginated.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground opacity-70 py-12">
              <span>
                No portfolios found. Try a different search or filter.
              </span>
            </div>
          )}
          {paginated.map((dev) =>
            cardView ? (
              <PortfolioCard key={dev.username} dev={dev} />
            ) : (
              <PortfolioListItem key={dev.username} dev={dev} />
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="px-3 py-2 text-sm font-medium">
              {page} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Card view
function PortfolioCard({ dev }: { dev: Portfolio }) {
  const [showMore, setShowMore] = useState(false);
  const avatarUrl = dev?.avatarUrl?.startsWith("http") ? dev.avatarUrl : "/placeholders/user.png";
  const router = useRouter();

  return (
    <div
      className="group bg-card/80 rounded-2xl shadow-lg px-2 py-2 flex flex-col gap-4 items-center text-center hover:shadow-blue-800 dark:hover:shadow-blue-900 transition-all duration-200 cursor-pointer hover:scale-105 relative"
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
      // onClick={() => setShowMore((v) => !v)}
      onClick={() => router.push(`/profile/${dev.username}`)}
    >
      <ProfileCard {...dev} />
      {/* {showMore && (
        <div className="absolute z-10 left-0 right-0 top-full mt-1 bg-background/90 rounded-xl shadow-xl p-4 text-left text-sm">
          <div className="mb-2 font-semibold">Bio:</div>
          <div className="mb-2">{dev.bio}</div>
          <div className="mb-2">
            <span className="font-semibold">Experience:</span>{" "}
            {dev.experience?.map((exp: any) => exp.title).join(", ") || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Location:</span>{" "}
            {dev.location || "N/A"}
          </div>
        </div>
      )} */}
      {/* <Button
        size="sm"
        variant="outline"
        className="mt-3 group-hover:bg-primary group-hover:text-neutral-950 transition-all"
        asChild
      >
        <a href={`/profile/${dev.username}`}>Portfolio</a>
      </Button> */}
    </div>
  );
}

// List view
function PortfolioListItem({ dev }: { dev: Portfolio }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-card/80 rounded-xl p-4 shadow border hover:border-primary/40 transition-all">
      <img
        src={dev.avatarUrl || "/avatars/default.png"}
        alt={dev.name}
        className="w-14 h-14 rounded-full border-2 border-indigo-300"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-lg">{dev.name}</span>
          <span className="text-xs text-muted-foreground">{dev.jobTitle}</span>
          {dev.company && (
            <span className="text-xs text-muted-foreground">
              @ {dev.company}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {dev.skills?.slice(0, 3).map((s: any) => (
            <Badge
              key={s.id}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              {s.name}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-1 truncate">
          {dev.bio}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {dev.socialLinks?.map((link: any) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            title={link.platform}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
        {dev.email && (
          <a
            href={`mailto:${dev.email}`}
            title="Contact"
            className="hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        )}
        <Button size="sm" variant="outline" className="ml-2" asChild>
          <a href={`/profile/${dev.username}`}>Portfolio</a>
        </Button>
      </div>
    </div>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "github":
      return <Code className="h-5 w-5" />;
    case "twitter":
      return <Users className="h-5 w-5" />;
    case "website":
      return <Globe className="h-5 w-5" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    default:
      return <Users className="h-5 w-5" />;
  }
}
