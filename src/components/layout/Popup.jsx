import { createPortal } from "react-dom"
import { usePopup } from "../../hooks"
import Container from "./Container"
import Stack from "./Stack"
import Button from "./Button"
import classNames from "classnames"

const Popup = () => {
  const { isOpen, popup, closePopup } = usePopup()

  return (
    isOpen && (
      createPortal(
        <div className="bg-medium bg-opacity-50 fixed top-0 left-0 grid place-items-center w-full h-full z-50">
          <Container className="max-w-sm sm:max-w-lg">
            <div className="bg-light dark:bg-dark rounded-shape p-4 shadow-lg">
              {
                popup.description && (
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
            </div>
          </Container>
        </div>, document.body
      )
    )
  )
}

export default Popup
