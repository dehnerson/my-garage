const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.handleVehicleUpdate = functions.region('europe-west1').firestore.document('vehicles/{vehicleId}').onUpdate((change, context) => {
    const updatedVehicle = change.after.data();
    const oldVehicle = change.before.data();

    let updatedImages = [];
    let oldImages = [];

    if (Array.isArray(updatedVehicle.documentImages)) {
        updatedImages = updatedVehicle.documentImages;
    }

    if (Array.isArray(oldVehicle.documentImages)) {
        oldImages = oldVehicle.documentImages;
    }

    const deletedImages = oldImages.filter(oldImage => {
        return !updatedImages.some(updatedImage => updatedImage.path === oldImage.path);
    });

    if (deletedImages.length > 0) {
        const bucket = admin.storage().bucket();

        const imagesRemovePromises = deletedImages.map((obj) => {
            return bucket.file(obj.path).delete();
        });

        return Promise.all(imagesRemovePromises);
    }

    return null;
});