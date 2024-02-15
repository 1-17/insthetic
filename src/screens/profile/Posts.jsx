import { IoMdGrid } from "react-icons/io"
import { LuTrash } from "react-icons/lu"
import classNames from "classnames"
import { useUser } from "../../hooks"
import Button from "../../components/layout/Button"

const Posts = () => {
  const { user, currentPost, setCurrentPost, deletePost } = useUser()

  return (
    user.posts.length > 0 && (
      <section>
        <nav>
          <ul className="border-b border-medium border-opacity-25 mb-1">
            <li className="border-b border-current">
              <Button
                aria-label="Posts"
                disabled
                variant="icon"
                full
                className="text-2xl sm:text-3xl h-12"
                >
                <IoMdGrid className="mx-auto" />
              </Button>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="grid grid-cols-3 gap-1">
            {
              user.posts.map(post =>
                <li
                  key={post.id}
                  name="post"
                  onClick={() => setCurrentPost(post) || currentPost === post && setCurrentPost(null)}
                  className="relative *:transition-all"
                  >
                  {
                    currentPost && (post.id === currentPost.id) && (
                      <div className="bg-medium bg-opacity-25 absolute top-0 left-0 grid place-items-center w-full h-full z-10">
                        <button
                          aria-label="Delete post"
                          onClick={deletePost}
                          className="bg-medium bg-opacity-50 border-2 rounded-full text-white text-[6vw] sm:text-4xl p-[3vw] sm:p-4"
                          >
                          <LuTrash />
                        </button>
                      </div>
                    )
                  }
                  <img
                    src={post.image}
                    alt="Post"
                    className={classNames(
                      "aspect-square object-cover w-full",
                      {
                        "saturate-0": currentPost && (post.id === currentPost.id)
                      }
                    )}
                  />
                </li>
              )
            }
          </ul>
        </nav>
      </section>
    )
  )
}

export default Posts
