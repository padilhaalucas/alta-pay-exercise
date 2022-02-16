import styles from "./styles.module.scss"

const Button = ({
	children,
	href,
	onClick,
	target,
	type = "primary",
	size = "md",
	disabled = false,
}) => {
	const buttonClass = `${styles.button} ${
		type ? styles[`type--${type}`] : ""
	} ${size ? styles[`size--${size}`] : ""}
	${disabled ? styles.disabled : ""}`

	if (!href) {
		return (
			<button
				onClick={disabled ? () => {} : onClick}
				type="button"
				className={buttonClass}
			>
				{children}
			</button>
		)
	}

	return (
    <a target={target} className={buttonClass} href={href}>
      {children}
    </a>
	)
}

export default Button
