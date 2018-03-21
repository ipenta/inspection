const detection = require('./detection.json')

export default {
    getDetectionList: () => {
        return {
            detection: detection
        }
    }
}
