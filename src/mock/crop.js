const crop = require( './crop.json' )

export default {
    getCropByType: config => {
        console.log( config )
        return {
            crop: crop
        }
    }
}
