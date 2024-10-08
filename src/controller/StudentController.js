import students from '../data/mockingStudents.js'

let stds = students;

class StudentsController {

  static findAllStudents(_req, res){
    res.status(200).json({students: stds});
  }

  static findStudentById(req, res){
    const {id} = req.params;

    const student = stds.find((student) => student.id == Number(id))

    if(!student){
      res.status(404).json({message: "Estudante não encontrado."})
      return;
    }

    res.status(200).json({
      name: student.name,
      media: student.media
    });
  }



  static saveStudent(req, res){
    const {name, n1, n2} = req.body;

    if(!validateNotes(n1, n2)){
      res.status(400).json({message: "Informe uma nota válida entre 0 e 10"});
      return;
    }



    const media = calcMedia(n1, n2);
    const status = statusStudent(media);

    const student = {
      id: stds.at(-1).id + 1,
      name,
      n1,
      n2,
      media,
      status
    }

    stds.push(student);
    res.status(201).json({student});
  }



  static updateStudent(req, res){
    const {id} = req.params;
    const {name, n1, n2} = req.body;

    if(!validateNotes(n1, n2)){
      res.status(400).json({message: "Informe uma nota válida entre 0 e 10"});
      return;
    }



    const studentIndex = stds.findIndex((student) => student.id == Number(id));

    if (studentIndex == -1){
      res.status(404).json({message: "Estudante não encontrado."});
      return;
    }

    const media = calcMedia(n1, n2);
    const status = statusStudent(media);

    stds[studentIndex] = {
      id: Number(id),
      name,
      n1,
      n2,
      media,
      status
    };
    res.status(200).json({student: stds[studentIndex]});
  }

  static deleteStudent(req, res){
    const {id} = req.params;

    const studentIndex = stds.findIndex((student) => student.id == Number(id));

    if (studentIndex == -1){
      res.status(404).json({message: "Estudante não encontrado!"});
      return;
    }

    stds = stds.filter((student) => student.id != Number(id));
    res.status(200).json({message: "Estudante removido com sucesso!"});
  }

}

function validateNotes(n1, n2){
  if(!Number.isFinite(n1)){
    return false;
  }
  if(!Number.isFinite(n2)){
    return false;
  }

  if(n1 < 0 || n1 > 10){
    return false;
  }

  if(n2 < 0 || n2 > 10){
    return false;
  }
  return true;
}

function calcMedia(n1, n2){
  return Number(((n1 + n2) / 2).toFixed(2));
}

function statusStudent(media){
  if(media >= 7){
    return "aprovado";
  }else if(media >= 4){
    return "recuperação"
  }else{
    return "reprovado"
  }
}

export default StudentsController;