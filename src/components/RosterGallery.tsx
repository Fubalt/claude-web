"use client";

import { useEffect, useState } from "react";

type RosterProfile = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  nationality: string;
  photos: string[];
  instagramUrl?: string;
};

export function RosterGallery() {
  const [profiles, setProfiles] = useState<RosterProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoster() {
      try {
        const res = await fetch("/api/roster");
        const data = await res.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching roster:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRoster();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No profiles available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <div key={profile.id} className="group cursor-pointer">
          <div className="relative mb-3 aspect-square overflow-hidden bg-muted">
            {profile.photos && profile.photos[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photos[0]}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            )}
          </div>
          <h3 className="font-medium text-foreground">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{profile.role}</p>
          {profile.instagramUrl && (
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Instagram ↗
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
