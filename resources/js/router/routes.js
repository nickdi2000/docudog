export default [
  ...applyRules(['guest'], [
    { path: '', component: require('$comp/auth/AuthWrapper').default, redirect: { name: 'map' }, children:
      [
        { path: '/map', name: 'map', component: require('$comp/home/MapWrapper').default },
				{ path: '/map/admin', name: 'map-admin', meta: {'admin' : true}, component: require('$comp/home/MapWrapper').default },
        { path: '/login', name: 'login', component: require('$comp/auth/login/Login').default },
        { path: '/register', name: 'register', component: require('$comp/auth/register/Register').default },
        { path: '/password', component: require('$comp/auth/password/PasswordWrapper').default, children:
          [
            { path: '', name: 'forgot', component: require('$comp/auth/password/password-forgot/PasswordForgot').default },
            { path: 'reset/:token', name: 'reset', component: require('$comp/auth/password/password-reset/PasswordReset').default }
          ]
        }
      ]
    },
  ]),
  ...applyRules(['auth'], [
    { path: '/admin', component: require('$comp/admin/AdminWrapper').default, children:
      [
        { path: '', name: 'index', redirect: { name: 'profile' } },
        { path: '/about', name: 'about', component: require('$comp/admin/about/About').default },
        { path: '/map', name: 'map', component: require('$comp/admin/map/Map').default },
        { path: '/profile', component: require('$comp/admin/profile/ProfileWrapper').default, children:
          [
            { path: '', name: 'profile', component: require('$comp/admin/profile/Profile').default },
            { path: 'edit', name: 'profile-edit', component: require('$comp/admin/profile/edit/ProfileEdit').default }
          ]
        }
      ]
    },
  ]),
  { path: '*', redirect: { name: 'index' } }
]

function applyRules(rules, routes) {
  for (let i in routes) {
    routes[i].meta = routes[i].meta || {}

    if (!routes[i].meta.rules) {
      routes[i].meta.rules = []
    }
    routes[i].meta.rules.unshift(...rules)

    if (routes[i].children) {
      routes[i].children = applyRules(rules, routes[i].children)
    }
  }

  return routes
}