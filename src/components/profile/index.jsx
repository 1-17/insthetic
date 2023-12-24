import Avatar from "./Avatar"
import Metrics from "./Metrics"
import Name from "./Name"
import Pronouns from "./Pronouns"
import Threads from "./Threads"
import Label from "./Label"
import Bio from "./Bio"
import Link from "./Link"
import Buttons from "./Buttons"
import Highlights from "./Highlights"

const Profile = () => {
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
        <Label />
        <Bio />
        <Link />
      </section>
      <section className="grid gap-2 py-2">
        <Buttons />
        <Highlights />
      </section>
    </>
  )
}

export default Profile
