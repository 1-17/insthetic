import { usePopup, useUser } from "../../hooks"
import Stack from "../layout/Stack"
import Button from "../layout/Button"
import Avatar from "../../screens/profile/Avatar"
import NewHighlight from "./_NewHighlight"
import NewPost from "./_NewPost"

const _AddMedia = () => {
  const { openComponentPopup } = usePopup()
  const { newHighlight, newPost } = useUser()
  
  return (
    <Stack className="max-xs:flex-col gap-4">
      <Button
        onClick={() => openComponentPopup(NewHighlight)}
        variant="icon"
        full
        className="border-2 border-medium border-opacity-25 rounded-shape h-40 first:*:w-fit first:*:mx-auto"
        >
        <Avatar highlights={{ cover: newHighlight.cover }} />
        New highlight
      </Button>
      <Button
        onClick={() => openComponentPopup(NewPost)}
        variant="icon"
        full
        className="border-2 border-medium border-opacity-25 rounded-shape h-40"
      >
        <img src={newPost.image} alt="Post" className="w-16 my-4 mx-auto" />
        New post
      </Button>
    </Stack>
  )
}

export default _AddMedia
