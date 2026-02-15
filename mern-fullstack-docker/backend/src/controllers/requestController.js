const Request = require('../models/Request')

exports.create = async (req, res, next) => {
  try{
    const { title, description, amount } = req.body
    const newReq = await Request.create({ title, description, amount, createdBy: req.user.id })
    res.status(201).json(newReq)
  }catch(err){ next(err) }
}

exports.list = async (req, res, next) => {
  try{
    const filter = {}
    if(req.user.role === 'USER') filter.createdBy = req.user.id
    const items = await Request.find(filter).populate('createdBy', 'name email')
    res.json(items)
  }catch(err){ next(err) }
}

exports.update = async (req, res, next) => {
  try{
    const { id } = req.params
    const updated = await Request.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updated)
  }catch(err){ next(err) }
}

// Approve / change status (ADMIN / MANAGER)
exports.approve = async (req, res, next) => {
  try{
    const { id } = req.params
    const doc = await Request.findById(id)
    if(!doc) return res.status(404).json({ message: 'Solicitud no encontrada' })

    // allow explicit status or default transition OPEN -> PENDING -> CLOSED
    const desired = req.body.status
    if(desired && ['OPEN','PENDING','CLOSED'].includes(desired)){
      doc.status = desired
    }else{
      doc.status = doc.status === 'OPEN' ? 'PENDING' : 'CLOSED'
    }

    await doc.save()
    res.json(doc)
  }catch(err){ next(err) }
}

exports.remove = async (req, res, next) => {
  try{
    const { id } = req.params
    await Request.findByIdAndDelete(id)
    res.json({ ok: true })
  }catch(err){ next(err) }
}
