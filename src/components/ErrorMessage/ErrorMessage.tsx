import css from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <p className={css.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
