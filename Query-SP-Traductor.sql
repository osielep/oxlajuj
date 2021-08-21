
/*
	+---------------------------------------+
	|	Tipo:	Buscar palabra				|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	30/07/2021					|
	+---------------------------------------+
	|  Modificado: 05/08/2021				|
	|  Detalle:	Se agrego autor				|
	+---------------------------------------+
	|  Modificado: 18/08/2021				|
	|  Detalle:	Se agrego acomulativo		|
	+---------------------------------------+
*/

alter PROC Idiomas.SPBuscarPalabra (@TxtPalabraEspanol NVARCHAR(50))
AS
DECLARE @IdPalabraAcumulativo INT
BEGIN
	
	SELECT @IdPalabraAcumulativo = ISNULL(MAX(p.IdPalabra),0)
	FROM 
		Idiomas.TblAutor a,
		Idiomas.TblCtaGramatical g,
		Idiomas.TblIdioma i,
		Idiomas.TblPalabra p,
		Idiomas.TblTipoDePalabra t
	WHERE 
		p.IdAutor = a.IdAutor and
		p.IdCategoriaGramatical = g.IdCtaGramatical and
		p.IdIdioma = i.IdIdioma and
		p.IdTipoPalabra = t.IdTipoPalabra and
		p.TxtPalabraEspanol LIKE '%'+@TxtPalabraEspanol+'%';
	----------------------------------------------------------------
	SELECT
		p.IdPalabra,
		p.TxtPalabraIdiomaMaya,
		p.TxtGenero,
		p.TxtImg,
		p.TxtAudio,
		t.TxtNombreTipoPalabra,
		g.TxtNombreCtaGramatical,
		CONCAT (a.TxtNombreAutor, ' ', a.TxtApellidoAutor) as TxtAutor


	FROM
		Idiomas.TblAutor a,
		Idiomas.TblCtaGramatical g,
		Idiomas.TblIdioma i,
		Idiomas.TblPalabra p,
		Idiomas.TblTipoDePalabra t

	WHERE	
	
		p.IdAutor = a.IdAutor and
		p.IdCategoriaGramatical = g.IdCtaGramatical and
		p.IdIdioma = i.IdIdioma and
		p.IdTipoPalabra = t.IdTipoPalabra and
		p.TxtPalabraEspanol LIKE '%'+@TxtPalabraEspanol+'%'

	EXEC Idiomas.SPAgregarAcumulado @IdPalabraAcumulativo

END



/*
	Tipo:	Buscar oraciones de ejemplo 
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	30/07/2021
	-------------------------------------
*/

ALTER PROC Idiomas.SPBuscarOracionesDeEjemplo (@TxtPalabraEspanol NVARCHAR(50))
AS
BEGIN
	
	select

		p.TxtPalabraEspanol,
		p.TxtPalabraIdiomaMaya,
		i.TxtNombreIdioma,
		t.TxtNombreTipoPalabra,
		c.TxtNombreCtaGramatical,
		o.TxOracionEspanol,
		o.TxtOracionIdiomaMaya
	    
	

	from
	
		Idiomas.TblCtaGramatical c,
		Idiomas.TblIdioma i,
		Idiomas.TblPalabra p,
		Idiomas.TblTipoDePalabra t,
		Idiomas.TblOracionEjemplo o

	where

		(p.IdCategoriaGramatical	=		c.IdCtaGramatical)	and
		(p.IdIdioma					=		i.IdIdioma)			and
		(p.IdTipoPalabra			=		t.IdTipoPalabra)	and
		(p.TxtPalabraEspanol		LIKE	'%'+@TxtPalabraEspanol+'%')		and
		(o.TxOracionEspanol			LIKE	'%'+@TxtPalabraEspanol+'%')

END

exec Idiomas.SPBuscarOracionesDeEjemplo taltuza

CONCAT (o.TxOracionEspanol, ' // ', o.TxtOracionIdiomaMaya) as TxtOracionEjemplo





/*
	+---------------------------------------+
	|	Tipo:	Agregar acumulado			|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	18/08/2021					|
	+---------------------------------------+
*/

CREATE PROC Idiomas.SPAgregarAcumulado (@IdPalabra INT)
AS
DECLARE @FilasAfectadas TINYINT,
		@Resultado		INT
BEGIN
	BEGIN TRAN

		BEGIN TRY
			update idiomas.TblPalabra
			set AcumuladoBusquedas = AcumuladoBusquedas + 1
			where IdPalabra = @IdPalabra
			SET @FilasAfectadas						= @@ROWCOUNT

		END TRY

		BEGIN CATCH
			SET @FilasAfectadas						= 0
		END CATCH

		-- Comprobación
		IF(@FilasAfectadas > 0)
			BEGIN
				COMMIT
			END
		ELSE
			BEGIN
				ROLLBACK 
			END
END 