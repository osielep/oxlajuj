
CREATE TABLE Aula.EspecializacionDetalle (
	IdEspecializacionDetalle int PRIMARY KEY,
	TxtNombreEspecializacion nvarchar(150) NOT NULL,
	TxtDescripcion nvarchar(500) NOT NULL,
	IntDescuento int,
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.EspecializacionProfesor (
	IdEspecializacionProfesor int PRIMARY KEY,
	IdEspecialziacionDetalle int NOT NULL,
	IdProfesor int NOT NULL,
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.Profesor (
	IdProfesor int PRIMARY KEY,
	IdUsuario int NOT NULL,
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.CursoDetalle (
	IdCursoDetalle int PRIMARY KEY,
	TxtNombreCurso nvarchar(200) NOT NULL,
	TxtDescripcion nvarchar(500) NOT NULL,
	TxtImagen nvarchar(150),
	IntNotaMinima decimal(5,2) NOT NULL,
	IntPrecioCurso decimal(10,2) NOT NULL,
	IdEspecialziacionDetalle int NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.CursoProfesor (
	IdCursoProfesor int PRIMARY KEY,
	IdCursoDetalle INT NOT NULL,
	IdProfesor INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblCursoCapitulo (
	IdCursoCapitulo INT PRIMARY KEY,
	IdCursoDetalle INT NOT NULL,
	IntNoCapitulo INT NOT NULL,
	TxtDescripcion nvarchar(300) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblCursoMaterial (
	IdCursoMaterial INT PRIMARY KEY,
	IdCursoCapitulo INT NOT NULL,
	IntNoMaterial INT NOT NULL,
	IdTipoMaterial INT NOT NULL,
	TxtUbicacionMaterial nvarchar(150) NOT NULL,
	IntObligatorio TINYINT DEFAULT 1,
	IntPuntos INT,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblTipoMaterial (
	IdTipoMaterial INT PRIMARY KEY,
	TxtTipoMaterial nvarchar(50) NOT NULL,
	TxtDescripcion nvarchar(150) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.TblEstudianteCursoAsignado (
	IdCursoAsignado INT PRIMARY KEY,
	IdEstudiante INT NOT NULL,
	IdAsignacionCursos INT NOT NULL,
	FechaDeAsignacion DATETIME DEFAULT getdate(),
	IdEstado INT NOT NULL,
	FechaEstado datetime not null,
	IntCalificacion decimal(5,2) NOT NULL,
	IdCertificado INT DEFAULT 100001 NOT NULL,
	UbicacionCertificado nvarchar(150) NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblEstudianteResultados (
	IdEstudianteResultados INT PRIMARY KEY,
	IdCursoAsignado INT NOT NULL,
	IdCursoMaterial INT NOT NULL,
	FechaInicio datetime DEFAULT getdate(),
	FechaFinallizacion datetime DEFAULT getdate(),
	IntPuntajeObtenido INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.TblEstudiante (
	IdEstudiante INT PRIMARY KEY,
	IntGrado INT NOT NULL,
	IdUsuario INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.Estado (
	IdEstado INT PRIMARY KEY,
	TxtNombreEstado nvarchar(50) NOT NULL,
	TxtDescripcion nvarchar(250) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblAsignacionCursos (
	IdAsignacionCursos INT PRIMARY KEY,
	IdCursoDetalle int NOT NULL,
	IdAsignacionEspecializacion int NOT NULL,
	FechaInicio datetime not null,
	FechaFin datetime not null,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TblAsignacionEspecializacion (
	IdAsignacionEspecializacion INT PRIMARY KEY,
	IdEspecializacionDetalle int NOT NULL,
	FechaInicio datetime not null,
	FechaFin datetime not null,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.TblEstudianteEspecializacionAsignada (
	IdEspecializacionAsignada INT PRIMARY KEY,
	IdEstudiante int not null,
	IdEspecialziacionDetalle int NOT NULL,
	FechaDeAsignacion DATETIME DEFAULT getdate(),
	IdEstado INT NOT NULL,
	FechaEstado datetime not null,
	IntCalificacion decimal(5,2) NOT NULL,
	IdCertificado INT DEFAULT 100001 NOT NULL,
	UbicacionCertificado nvarchar(150) NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)