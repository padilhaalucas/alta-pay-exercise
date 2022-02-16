import { confirmAlert } from 'react-confirm-alert'

import './cornerAlert.scss'

export const useAlertActions = ({ shouldReload }) => {

  const cornerAlert = (
    title,
    subtitle,
    primaryButtonText,
    mainStyleClass,
    primaryButtonClass,
    primaryButtonAction,
    shouldRenderButton,
  ) => confirmAlert({
    customUI: ({ onClose }) => {

      // setTimeout(() => {
      //   onClose()
      //   window.location.reload()
      // }, 2500)

      return (
        <div className={`custom-ui corner-confirmAlertContainer ${mainStyleClass}`}>
          <div className={'corner-messageContainer'}>
            <h1 className={'corner-title'}>{title}</h1>
            { subtitle && <p>{subtitle}</p> }
            { shouldRenderButton &&
              <button className={primaryButtonClass} onClick={() => {
                onClose()
                primaryButtonAction()
              }}>{primaryButtonText}</button>
            }
          </div>

        </div>
      )
    },
    closeOnClickOutside: true
  })

  const handleCornerAlerts = ({
    loaded,
    error,
    resolvedMessage,
    success,
  }) => {
    if (success) {
      cornerAlert(
        resolvedMessage,
        null,
        'Ok',
        'corner-containerSuccess',
        'corner-primaryAlertButtonSuccess',
        () => {},
        false,
      )
    } else if (loaded && error?.message?.includes('400')) {
      cornerAlert(
        'Ops...',
        'We had an error, sorry!',
        'Try again',
        'corner-containerError',
        'corner-primaryAlertButtonError1',
        () => {},
        true,
      )
    } else if (loaded && error?.message?.includes('500')) {
      cornerAlert(
        'Ops...',
        'The server had an error, contact us.',
        'Understand',
        'corner-containerError',
        'corner-primaryAlertButtonError2',
        () => shouldReload && window.location.reload(),
        true,
      )
    } else if (loaded && error?.message?.includes('Network Error')) {
      cornerAlert(
        'Network Issues',
        'Looks like your network has a problem...',
        'Reload page',
        'corner-containerAlert',
        'corner-primaryAlertButtonWarning',
        () => {},
        true,
      )
    } else return
  }

  return { handleCornerAlerts }
}