const express = require('express')
const authMiddleware = require('../middlewares/auth')
const {Router} = require('express')
const Project = require('../models/Projects')
const Task = require('../models/Tasks')


const router = Router ()

class ProjectController{
    async show(req,res){
        try{
            const project = await Project.find().populate(['user','tasks'])
            return res.status(200).send({project})
        }catch(e){
            console.log(e)
            return res.status(400).send({message:"Error loading  project"})
        }
    }

    async index(req,res){
        try{
            const project = await Project.findById(req.params.projectId).populate(['user','tasks'])
            return res.status(200).send({project})
        }catch(e){
            console.log(e)
            return res.status(400).send({message:"Error loading  project"})
        }
    }
    async store(req,res){
        try{
            const {title,description, tasks} = req.body
            const project = await Project.create({title,description, user: req.userId})

          await Promise.all(tasks.map(async (task)=>{
                const projectTask = new Task({...task, project:project._id})
                await projectTask.save()
                project.tasks.push(projectTask)
            }))

            await project.save()
            return res.status(201).send({project})
        }catch(e){
            console.log(e)
            return res.status(400).send({message:"Error creating new project"})
        }
    }
    async update(req,res){
        try{
            const {title,description, tasks} = req.body

            const project = await Project.findByIdAndUpdate(req.params.projectId,{
                title,
                description
            },{new:true})
            project.tasks=[]
            await Task.remove({project:project._id})
          await Promise.all(tasks.map(async (task)=>{
                const projectTask = new Task({...task, project:project._id})
                await projectTask.save()
                project.tasks.push(projectTask)
            }))

            await project.save()
            return res.status(201).send({project})
        }catch(e){
            console.log(e)
            return res.status(400).send({message:"Error updatiing new project"})
        }
      
    }
    async delete(req,res){
        try{
            const project = await Project.findByIdAndRemove(req.params.projectId).populate('user')
            return res.status(200).send()
        }catch(e){
            console.log(e)
            return res.status(400).send({message:"Error loading  project"})
        }
    }
}
module.exports =  new ProjectController()