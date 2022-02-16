import styles from "./styles.module.scss";

const Columns = ({ sm = 3, md, lg, xl, children, className }) => {
	return (
		<div
			className={`${styles.columns} ${className}`}
			style={{ "--cols": sm, "--cols__md": md, "--cols__lg": lg, cols__xl: xl }}
		>
			{children}
		</div>
	);
};
export default Columns;
