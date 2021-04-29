import { SvgIcon } from '@material-ui/core';

export default function BarChart({ title = 'Monthly', ...rest }) {
  return (
    <SvgIcon {...rest}>
      <title>{title}</title>
      <path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
    </SvgIcon>
  );
}
