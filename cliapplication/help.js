const menus = {
    main: `
      outside [command] <options>
  
      SELECT ..................     desc. req.
      INSERT_INTO .............     desc. req.
      DELETE_FROM .............     desc. req.
      CREATE_TABLE ............     desc. req.
      UPDATE ..................     desc. req.`

  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }