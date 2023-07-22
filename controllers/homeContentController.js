const HomeContent = require('../models/homeContentModel');
const HomeCounting = require('../models/homeCountingModel');

const createSection = async (request, response) => {
    const homeContent = new HomeContent({
        title: request.body.title,
        description: request.body.description,
        media: request.file.path,
        useMedia: request.body.useMedia,
    })

    await homeContent.save()

        .then((data) => {
            if (data)
                response.json({ success: true, message: "Home page content successfully added.", data: data });
        })

        .catch((error) => {
            response.json({ success: false, message: error });
        })
}

const fetchHomeData = async (request, response) => {
    try {
        let homeContent = await HomeContent.find({});

        let homeCounting = await HomeCounting.findOne();

        if(homeContent && homeCounting){
            let data = {
                content: homeContent,
                counting: homeCounting
            }

            response.json({ success: true, data: data });
        }
    } catch (error) {
        response.json({ success: false, message: error });
    }
}

const getSection = async (request, response) => {
    HomeContent.find({ _id: request.body.id })

        .then((data) => {
            response.json({ success: true, data: data });
        })

        .catch((error) => {
            response.json({ success: false, message: error });
        })
}

const updateSection = async (request, response) => {
    let updateData = {
        title: request.body.title,
        description: request.body.description
    };

    if (request.file) {
        updateData.media = request.file.path;
        updateData.useMedia = request.body.useMedia;
    }

    let options = { new: true };

    await HomeContent.findByIdAndUpdate(request.body.id, updateData, options)

        .then(() => {
            response.json({ success: true, message: "Section successfully edited." });
        })

        .catch((error) => {
            response.json({ success: false, message: error });
        })
}

const deleteHomeSection = async (request, response) => {
    await HomeContent.findOneAndDelete({ _id: request.body.id })

        .then(() => {
            response.json({ success: true, message: "Home page section successfully deleted." });
        })

        .catch((error) => {
            response.json({ success: false, message: error });
        })
}

const getHomeCounting = async (request, response) => {
    await HomeCounting.findOne()

        .then((data) => {
            response.json({ success: true, data: data });
        })

        .catch((error) => {
            response.json({ success: false, message: error });
        })
}

const updateHomeCounting = async (request, response) => {
    try {
      const data = await HomeCounting.findOne();
  
      if (data === null) {
        let homeCounting = new HomeCounting({
          ration: request.body.ration,
          education: request.body.education,
          orphanage: request.body.orphanage,
          medical: request.body.medical,
          food: request.body.food
        });
  
        const savedData = await homeCounting.save();
  
        if (savedData) {
          return response.status(200).json({ success: true, message: "Countings successfully updated." });
        }
      } else {
        data.ration = request.body.ration;
        data.education = request.body.education;
        data.orphanage = request.body.orphanage;
        data.medical = request.body.medical;
        data.food = request.body.food;
  
        const savedData = await data.save();
  
        if (savedData) {
          return response.status(200).json({ success: true, message: "Countings successfully updated." });
        }
      }
    } catch (error) {
      response.status(500).json({ success: false, message: error.toString() });
    }
  }
  

module.exports = { createSection, fetchHomeData, getSection, updateSection, deleteHomeSection, getHomeCounting, updateHomeCounting }