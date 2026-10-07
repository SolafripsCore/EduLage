import Image from "next/image";
import Link from "next/link";
import { learnLinks } from "@/lib/site";

const columns = [
  { title: "Discover", links: [["Programmes & courses", "/programmes"], ["Institutions", "/institutions"], ["Study options", "/study-types"], ["GOE Centers", "/open-education-centers"]] },
  { title: "For learners", links: [["My learning", learnLinks.myLearning], ["Help & support", "/help"], ["Verify a credential", "/verify"], ["Quality & trust", "/quality-and-trust"]] },
  { title: "Work with us", links: [["For institutions", "/for-institutions"], ["Become a center partner", "/open-education-centers#operate"], ["GOE Initiative", "/goe"], ["Contact us", "/contact"]] },
];
export function Footer() {
  return <footer className="ed-footer"><div className="container-page">
    <div className="ed-footer-grid"><div className="ed-footer-brand"><Link href="/" aria-label="EduLage home"><Image src="/brand/edulage-logo.png" alt="EduLage" width={150} height={54}/></Link><p className="ed-footer-tagline">The Global Education Village</p><p>Connecting ambition with education, institutions and opportunity.</p><Link href="/about" className="ed-footer-about">About EduLage</Link></div>
      {columns.map(column=><div key={column.title}><h2>{column.title}</h2><ul>{column.links.map(([label,href])=><li key={label}><Link href={href}>{label}</Link></li>)}</ul></div>)}
    </div><div className="ed-footer-bottom"><p>© {new Date().getFullYear()} EduLage. All rights reserved.</p><nav aria-label="Legal and accessibility">{[["Privacy","/privacy"],["Terms","/terms"],["Accessibility","/accessibility"],["Data protection","/data-protection"]].map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</nav><span lang="en">English</span></div>
  </div></footer>;
}
