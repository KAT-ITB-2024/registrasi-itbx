import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href="/igt-registration">
        <p className="font-mogula">Go To ITB Got Talent</p>
      </Link>
      <Link href="/festival-registration">
        <p className="font-mogula">Go To Festival</p>
      </Link>
    </div>
  );
}
``;
