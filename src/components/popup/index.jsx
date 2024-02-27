import { createPortal } from "react-dom"
import { LuX } from "react-icons/lu"
import classNames from "classnames"
import { usePopup } from "../../hooks"
import Container from "../layout/Container"
import Stack from "../layout/Stack"
import Button from "../layout/Button"

const Popup = () => {
  const { isOpen, isBasicPopup, isComponentPopup, popup, closePopup } = usePopup()
  
  return (
    isOpen && (
      createPortal(
        <div className="bg-medium bg-opacity-50 fixed top-0 left-0 grid place-items-center w-full h-full z-50">
          <Container className="max-w-sm sm:max-w-lg">
            <div className={classNames(
              "bg-light dark:bg-dark rounded-shape p-4 shadow-lg",
              {
                "relative pt-12": isComponentPopup
              }
            )}>
              {
                isBasicPopup && (
                  <>
                    {
                      popup.title && (
                        <h3 className="text-xl sm:text-2xl font-semibold mb-1">
                          {popup.title}
                        </h3>
                      )
                    }
                    <p>{popup.description}</p>
                    <Stack className={classNames(
                      "gap-2 mt-4 ml-auto",
                      {
                        "max-w-[150px]": !popup.ok,
                        "max-w-[200px] sm:max-w-xs": popup.ok
                      }
                    )}>
                      <Button
                        onClick={() => {
                          popup.ok ? popup.ok() : closePopup()
                        }}
                        variant="gradient"
                        full
                      >
                        OK
                      </Button>
                      {
                        popup.ok && (
                          <Button
                            onClick={() => {
                              popup.cancel && popup.cancel()
                              closePopup()
                            }}
                            full
                          >
                            Cancel
                          </Button>
                        )
                      }
                    </Stack>
                  </>
                )
              }
              {
                isComponentPopup && (
                  <>
                    <Button
                      aria-label="Close popup"
                      onClick={closePopup}
                      variant="icon"
                      className="rounded-full absolute top-1 right-1 text-2xl p-2"
                    >
                      <LuX aria-label="Close" />
                    </Button>
                    {popup}
                  </>
                )
              }
            </div>
          </Container>
        </div>, document.body
      )
    )
  )
}

export default Popup
export { default as EditHighlight } from "./_EditHighlight"
export { default as AddMedia } from "./_AddMedia"
