const connect = require(`../utilities/connect-to-db`)
const {register} = require('../models/credentials')
const {createCourse, getCourses} = require('../models/courses')
const {createSubject, getSubjects} = require('../models/subjects')
const {createUnit, getUnits} = require('../models/units')
const {createPage, updatePage, getPages} = require('../models/pages')
const blocks = require('../models/blocks')

connect().then(main).catch(handleError).finally(endProgram)

const userId = '5e56452930357e2da571d1f2'

async function main(params) {
    /*const user = await register({
        name: 'raul',
        surname: 'contreras',
        password: 'alumno',
        email: 'sarmanulco@gmail.com'
    })
    const course = await createCourse({
        title: '1 Educación Secundaria Obligatoria',
        abbr: '1ESO',
        color: '#0f0'
    }, user)*/
    // console.log(course);
    const [primeroESO] = await getCourses(userId)
    /*const CLL = await createSubject({title: 'Castellano', abbr: 'CLL', color: '#fde'}, primeroESO)
    const ING = await createSubject({title: 'Ingles', abbr: 'ING', color: '#ffe'}, primeroESO)
    const CS = await createSubject({title: 'Ciencias sociales', abbr: 'CS', color: '#0de'}, primeroESO)
    const CN = await createSubject({title: 'Ciencias naturales', abbr: 'CN', color: '#fdf'}, primeroESO)*/
    const [CLL] = await getSubjects(primeroESO)
    // const primeraUnidad = await createUnit({title: 'Pronombres personales'}, CLL)
    // const segundaUnidad = await createUnit({title: 'Pronombres posesivos'}, CLL)
    // const terceraUnidad = await createUnit({title: 'Sintagma nominal'}, CLL)
    const [primeraUnidad] = await getUnits(CLL)
    // const primeraPagina = await createPage({title: 'Primera pagina', number: 1}, primeraUnidad)
    // const segundaPagina = await createPage({title: 'Segunda pagina', number: 2}, primeraUnidad)
    // const terceraPagina = await createPage({title: 'Tercera pagina', number: 3}, primeraUnidad)
    const [primeraPagina] = await getPages(primeraUnidad)
    const pageUpdated = await updatePage({title: 'Primera pagina actualizada por segunda vez'}, primeraPagina._id, [
        {number: 1, type: 'paragraph', content: 'Hola mundo <b>que tal</b> estáis 1', page: primeraPagina},
        {number: 2, type: 'paragraph', content: 'Hola mundo <b>que tal</b> estáis 2', page: primeraPagina},
        {number: 3, type: 'paragraph', content: 'Hola mundo <b>que tal</b> estáis 3', page: primeraPagina},
    ])
    console.log(pageUpdated);
}







function handleError(err) {
    console.log(err);
    console.log(`Hubo un error de conexión a la base de datos: ${err.message}`)
    process.exit(1)
}
function endProgram() {
    process.exit(0)
}