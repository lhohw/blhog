import NavLinks from "@/app/ui/posts/NavLinks";
import { fetchDirectoryNames } from "@/app/lib/actions";

export default async function SideNav() {
  const links = await fetchDirectoryNames();
  return <NavLinks links={links} />;
}
