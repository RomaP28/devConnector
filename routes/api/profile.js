const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name','avatar']);

        if(!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Create or update profile
router.post('/', [auth,
    check('status','Status is required')
        .not()
        .isEmpty(),
    check('skills','skills is required')
        .not()
        .isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company, website, location, bio,
            status, githubusername, skills, youtube,
            facebook, twitter, instagram, linkedin
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills;


    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user: req.user.id });

        if(profile) {
            // update profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true });

            return res.json(profile);
        }

        // create profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

//Get profiles
//public access
router.get('/', async (req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//Get profile by user id
//public access
router.get('/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

        if(!profile || profile.length < 1) return res.status(400).json({msg: 'Profile not found'})

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({msg: 'Profile not found'})

        res.status(500).send('Server error')
    }
})

//Delete profile, user and posts
//private access
router.delete('/', auth, async (req, res) => {
    try{
        //remove users posts
        await Post.deleteMany({ user: req.user.id })
        //remove users profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//Add profile experience
//private access

router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
            title, company, location, from,
            to, current, description
          } = req.body;

    const newExp = {
            title, company, location, from,
            to, current, description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//delete experience from profile
//private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



//Add profile education
//private access

router.put('/education', [auth, [
    check('school', 'School is required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of study date is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school, degree, fieldofstudy, from,
        to, current, description
    } = req.body;

    const newEdu = {
        school, degree, fieldofstudy, from,
        to, current, description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//delete education from profile
//private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

//get user repos from Github
//public

router.get('/github/:username',(req, res)=>{
    try{
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${
                config.get('githubClientId')
            }&client_secret=${
                config.get('githubSecret')
            }`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }

        request(options, (error, response, body)=>{
            if(error) console.error(error);
            // console.log(body);
            if(response.statusCode !== 200) {
                return res.status(404).json({msg: 'No Github profile found'});
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



module.exports = router;
