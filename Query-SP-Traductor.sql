
/*
	Tipo:	Buscar palabra
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	30/07/2021
	-------------------------------------
*/

alter PROC Idiomas.SPBuscarPalabra (@TxtPalabraEspanol NVARCHAR(50))
AS
BEGIN
	
	SELECT
	
	p.TxtPalabraIdiomaMaya,
	p.TxtGenero,
	p.TxtImg,
	p.TxtAudio,
	t.TxtNombreTipoPalabra,
	g.TxtNombreCtaGramatical

FROM
	
	Idiomas.TblCtaGramatical g,
	Idiomas.TblIdioma i,
	Idiomas.TblPalabra p,
	Idiomas.TblTipoDePalabra t

WHERE	
	
	p.IdAutor is null and
	p.IdCategoriaGramatical = g.IdCtaGramatical and
	p.IdIdioma = i.IdIdioma and
	p.IdTipoPalabra = t.IdTipoPalabra and
	p.TxtPalabraEspanol LIKE '%'+@TxtPalabraEspanol+'%'

END



/*
	Tipo:	Buscar oraciones de ejemplo 
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	30/07/2021
	-------------------------------------
*/

CREATE PROC SPBuscarOracionesDeEjemplo (@TxtPalabraEspanol NVARCHAR(50))
AS
BEGIN
	
	select

		p.TxtPalabraEspanol,
		p.TxtPalabraIdiomaMaya,
		i.TxtNombreIdioma,
		t.TxtNombreTipoPalabra,
		c.TxtNombreCtaGramatical,
		CONCAT (o.TxOracionEspanol, ' // ', o.TxtOracionIdiomaMaya) as TxtOracionEjemplo
	

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

exec SPBuscarOracionesDeEjemplo taltuza
