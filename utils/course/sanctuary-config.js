const { create, env } = require ('sanctuary')

const S = create ({
  checkTypes: process.env.NODE_ENV !== 'production',
  env,
})

export {
  S
}
