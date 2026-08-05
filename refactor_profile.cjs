const fs = require('fs');
const file = 'src/routes/_authenticated/profile.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add new imports
const newImports = `
import { ProfileHero } from "@/components/profile-v2/ProfileHero";
import { ProfileNav } from "@/components/profile-v2/ProfileNav";
import { CareerOverview } from "@/components/profile-v2/CareerOverview";
import { SkillsSection } from "@/components/profile-v2/SkillsSection";
import { ProjectsSection } from "@/components/profile-v2/ProjectsSection";
import { CodingProfilesSection } from "@/components/profile-v2/CodingProfilesSection";
import { ResumeSummary } from "@/components/profile-v2/ResumeSummary";
import { GithubSummary } from "@/components/profile-v2/GithubSummary";
import { AchievementsSection } from "@/components/profile-v2/AchievementsSection";
import { ActivityTimeline } from "@/components/profile-v2/ActivityTimeline";
import { EditProfileForm } from "@/components/profile-v2/EditProfileForm";
`;

content = content.replace('import { Input } from "@/components/ui/input";', newImports + '\nimport { Input } from "@/components/ui/input";');

// 2. Add isEditExpanded state
content = content.replace('const nav = useNavigate();', 'const nav = useNavigate();\n  const [isEditExpanded, setIsEditExpanded] = useState(false);\n\n  const scrollToSection = (id: string) => {\n    const el = document.getElementById(id);\n    if (el) {\n      el.scrollIntoView({ behavior: "smooth", block: "start" });\n    }\n  };\n\n  const handleEditClick = () => {\n    setIsEditExpanded(true);\n    setTimeout(() => scrollToSection("edit-profile"), 100);\n  };\n');

// 3. Replace the return block
const newReturn = `  // Calculate profile completion
  const fields = ['full_name', 'phone', 'city', 'college', 'branch', 'graduation_year', 'target_role', 'dream_companies', 'preferred_location', 'linkedin', 'github'];
  const filledFields = fields.filter(f => profile?.[f] && (Array.isArray(profile[f]) ? profile[f].length > 0 : true));
  const completionPct = Math.round((filledFields.length / fields.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-2 pb-32">
      <ProfileHero 
        profile={profile}
        placementStats={placementStats}
        completionPct={completionPct}
        uploading={uploading}
        onEditClick={handleEditClick}
        onUploadClick={() => scrollToSection("edit-profile")}
      />
      
      <ProfileNav />
      
      <CareerOverview profile={profile} />
      <SkillsSection profile={profile} onEditClick={handleEditClick} />
      <ProjectsSection profile={profile} onEditClick={handleEditClick} />
      <CodingProfilesSection profile={profile} onEditClick={handleEditClick} />
      <ResumeSummary placementStats={placementStats} uploading={uploading} onUpload={handleResumeUpload} />
      <GithubSummary profile={profile} placementStats={placementStats} />
      <AchievementsSection onViewAllClick={() => console.log("Open achievement modal")} />
      <ActivityTimeline placementStats={placementStats} />

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
    </div>
  );
}
`;

// Extract everything up to the comment
const returnIndex = content.indexOf('  // Calculate profile completion');
if (returnIndex !== -1) {
  content = content.substring(0, returnIndex) + newReturn;
}

fs.writeFileSync(file, content);
console.log('Successfully updated profile.tsx');
