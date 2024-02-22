import Avatar from "./Avatar"
import Metrics from "./Metrics"
import Name from "./Name"
import Pronouns from "./Pronouns"
import Threads from "./Threads"
import Category from "./Category"
import Bio from "./Bio"
import Link from "./Link"
import Buttons from "./Buttons"
import Highlights from "./Highlights"
import Posts from "./Posts"

const _Profile = () => {
  return (
    <>
      <section className="flex justify-between items-center gap-2">
        <Avatar profile />
        <Metrics />
      </section>
      <section>
        <Name />
        <Pronouns />
        <Threads />
        <Category />
        <Bio />
        <Link />
      </section>
      <section className="grid gap-2 py-2">
        <Buttons />
        <Highlights />
      </section>
      <Posts />
    </>
  )
}

export default _Profile
