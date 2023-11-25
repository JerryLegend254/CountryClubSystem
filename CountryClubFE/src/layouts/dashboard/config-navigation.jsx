import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Members',
    path: '/members',
    icon: icon('ic_user'),
  },
  {
    title: 'view plans',
    path: '/view-plans',
    icon: icon('ic_sportsplan'),
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'add plan',
    path: '/addplan',
    icon: icon('ic_addplan'),
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: icon('ic_payments'),
  },
];

export default navConfig;
