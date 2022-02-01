// TODO: Add better accessibility to buttons. Maybe add a tooltip? Or a label of some kind?

// TODO: Update the messages for all these items

// TODO: Make button outlines all match (tab through to see incorrect behavior)

// TODO: Add "text copied to clipboard" for link share

import React, { useState } from "react"
import PropTypes from "prop-types"
import { Dialog } from "@headlessui/react"
import {
  ShareIcon,
  LinkIcon,
  DeviceMobileIcon,
  XIcon,
} from "@heroicons/react/outline"
import Button from "./Button"
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"

const SocialSharingDialog = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false)

  const shareLink = `https://pw.church${link}`
  const personalShareText = `I thought you might like this message from Pathway Community Church.`
  const generalShareText = `This was a great message from Pathway Community Church.`

  return (
    <>
      <Button
        className="w-auto rounded-full px-6"
        onClick={() => setIsOpen(true)}
      >
        <ShareIcon className="h-5 mr-3" />
        Share This Message
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-xl max-w-sm mx-auto p-12">
            <Dialog.Title>
              <h1 className="text-5xl font-bold text-center text-gray-700">
                Share This Message
              </h1>
            </Dialog.Title>

            <div className="grid grid-cols-3 grid-rows-2 gap-8 justify-items-center mt-12">
              <EmailShareButton
                data-tooltip-target="tooltip-default"
                url={shareLink}
                subject={personalShareText}
                body={personalShareText}
              >
                <EmailIcon size={42} round={true} />
              </EmailShareButton>

              <FacebookShareButton
                data-tooltip-target="tooltip-default"
                url={shareLink}
                quote={generalShareText}
              >
                <FacebookIcon size={42} round={true} />
              </FacebookShareButton>

              <WhatsappShareButton
                data-tooltip-target="tooltip-default"
                url={shareLink}
                title={personalShareText}
              >
                <WhatsappIcon size={42} round={true} />
              </WhatsappShareButton>

              <TwitterShareButton
                data-tooltip-target="tooltip-default"
                url={shareLink}
                title={generalShareText}
              >
                <TwitterIcon size={42} round={true} />
              </TwitterShareButton>

              <button
                className="h-[42px] w-[42px] rounded-full p-2 bg-slate-500"
                data-tooltip-target="tooltip-default"
              >
                <LinkIcon className="stroke-white" />
              </button>

              <a
                href={`sms:?&body=${personalShareText} ${shareLink}`}
                className="h-[42px] w-[42px] rounded-full p-2 bg-violet-400"
                data-tooltip-target="tooltip-default"
              >
                <DeviceMobileIcon className="stroke-white" />
              </a>
            </div>

            <button
              className="absolute top-3 right-3 h-5 w-5"
              onClick={() => setIsOpen(false)}
              alt="Close Dialog"
              aria-label="Close dialog"
            >
              <XIcon className="stroke-gray-500" />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

SocialSharingDialog.propTypes = {
  link: PropTypes.string.isRequired,
}

export default SocialSharingDialog
