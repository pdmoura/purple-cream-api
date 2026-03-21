const Team = require("../models/Team");

const getAllTeamMembers = async (req, res) => {
  // #swagger.tags = ['Team']
  // #swagger.description = 'Retrieve all team members'
  try {
    const teamMembers = await Team.find();
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleTeamMember = async (req, res) => {
  // #swagger.tags = ['Team']
  // #swagger.description = 'Retrieve a team member by ID'
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(teamMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTeamMember = async (req, res) => {
  /*  #swagger.tags = ['Team']
      #swagger.description = 'Create a new team member'
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Team member data',
          schema: {
              $name: 'John Doe',
              $title: 'Chief Acai Officer',
              $description: 'Acai enthusiast with 10 years of experience',
              $image: 'https://example.com/john.jpg',
              role: 'Founder',
              $email: 'john@purplecream.com',
              hobbies: ['Surfing', 'Healthy Living']
          }
      } */
  try {
    const teamMember = new Team(req.body);
    const savedTeamMember = await teamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTeamMember = async (req, res) => {
  /*  #swagger.tags = ['Team']
      #swagger.description = 'Update a team member by ID'
      #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Team member data to update',
          schema: {
              title: 'CEO',
              role: 'Management'
          }
      } */
  try {
    const updatedTeamMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeamMember) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(updatedTeamMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTeamMember = async (req, res) => {
  // #swagger.tags = ['Team']
  // #swagger.description = 'Remove a team member from the database'
  try {
    const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeamMember) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTeamMembers, getSingleTeamMember, createTeamMember, updateTeamMember, deleteTeamMember };
