import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Add to my plans',
    path: '/user-index/add-plan',
    icon: icon('ic_addplan'),
  },
  {
    title: 'My payments',
    path: '/user-index/user-payments',
    icon: icon('ic_payments'),
  },
  {
    title: 'Profile',
    path: '/user-index/profile',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
