const fs = require('fs');
const file = 'src/routes/_authenticated/profile.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add ProfileMobileNav and ProfileSidebarNav
content = content.replace('import { ProfileNav } from "@/components/profile-v2/ProfileNav";', 'import { ProfileSidebarNav, ProfileMobileNav } from "@/components/profile-v2/ProfileSidebarNav";');

// Add xpLevel and streak states
if (!content.includes('const [xpLevel, setXpLevel] = useState<any>(null);')) {
  content = content.replace('const [loading, setLoading] = useState(true);', 'const [loading, setLoading] = useState(true);\n  const [xpLevel, setXpLevel] = useState<any>(null);\n  const [streak, setStreak] = useState<any>(null);');
}

// Add the fetches in load()
if (!content.includes('xp_levels')) {
  const loadTarget = `const { data: stats } = await supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();`;
  const loadRepl = `${loadTarget}\n      const { data: xpData } = await supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle();\n      const { data: streakData } = await supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle();\n      if (xpData) setXpLevel(xpData);\n      if (streakData) setStreak(streakData);`;
  content = content.replace(loadTarget, loadRepl);
}

// The new return block with 2-column layout
const newReturn = `  // Calculate profile completion
  const fields = ['full_name', 'phone', 'city', 'college', 'branch', 'graduation_year', 'target_role', 'dream_companies', 'preferred_location', 'linkedin', 'github'];
  const filledFields = fields.filter(f => profile?.[f] && (Array.isArray(profile[f]) ? profile[f].length > 0 : true));
  const completionPct = Math.round((filledFields.length / fields.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      <ProfileHero 
        profile={profile}
        placementStats={placementStats}
        completionPct={completionPct}
        xpLevel={xpLevel}
        streak={streak}
        uploading={uploading}
        onEditClick={handleEditClick}
        onUploadClick={() => scrollToSection("edit-profile")}
      />
      
      <ProfileMobileNav />
      
      <div className="flex flex-col md:flex-row gap-8 relative mt-8">
        <ProfileSidebarNav />
        
        <div className="flex-1 space-y-16 min-w-0">
          
          <section id="career-group" className="space-y-10 scroll-mt-24">
            <CareerOverview profile={profile} />
            <SkillsSection profile={profile} onEditClick={handleEditClick} />
            <ProjectsSection profile={profile} onEditClick={handleEditClick} />
          </section>

          <section id="professional-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <CodingProfilesSection profile={profile} onEditClick={handleEditClick} />
            <div id="resume-github" className="grid lg:grid-cols-2 gap-6 scroll-mt-24">
              <ResumeSummary placementStats={placementStats} uploading={uploading} onUpload={handleResumeUpload} />
              <GithubSummary profile={profile} placementStats={placementStats} />
            </div>
          </section>
          
          <section id="growth-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <AchievementsSection onViewAllClick={() => console.log("Open achievement modal")} />
            <ActivityTimeline placementStats={placementStats} />
          </section>

          <section id="settings-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <EditProfileForm 
              user={user}
              profile={profile}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleArrayChange={handleArrayChange}
              handleSave={handleSave}
              saving={saving}
              uploading={uploading}
              handleResumeUpload={handleResumeUpload}
              isExpanded={isEditExpanded}
              onToggle={() => setIsEditExpanded(!isEditExpanded)}
            />
          </section>

        </div>
      </div>
    </div>
  );
}
`;

const returnIndex = content.indexOf('  // Calculate profile completion');
if (returnIndex !== -1) {
  content = content.substring(0, returnIndex) + newReturn;
}

fs.writeFileSync(file, content);
console.log('Successfully updated profile.tsx for Sidebar layout');
