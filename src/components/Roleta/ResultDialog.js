import React from 'react'

export default ResultDialog = (props) => {
    return <StyledDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => { setOpen(false) }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth='md'
    >
        <DialogTitle id="customized-dialog-title"
            onClose={() => { setOpen(false) }}
            style={{
                color: '#ffffff'
            }}>E o assunto escolhido foi...</DialogTitle>

        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 7,
            padding: '50px 30px'
        }}>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Grid container>
                        <Grid item sm={6} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: 27,
                                fontWeight: 800,
                                color: colors.black
                            }}>If e else</div>
                            <div style={{
                                fontSize: 18,
                                // fontWeight: 600,
                                color: colors.black
                            }}>{assunto}</div>
                            <div style={{
                                fontSize: 14,
                                color: colors.black
                            }}> 5 questões</div>

                        </Grid>
                        <Grid item sm={6}>
                            <GraficoSubmissoes />
                            <div>Seu desempenho em <b>If e else</b></div>
                        </Grid>
                        <Grid item sm={12} style={{ textAlign: "center" }}>
                            <Button variant="contained"
                                style={{
                                    backgroundColor: colors.blue,
                                    padding: '10px 40px',
                                    color: 'white',
                                    margin: '0',
                                    fontSize: 16,
                                    marginTop: 30,
                                    fontWeight: 500,
                                    letterSpacing: 1.3
                                }}>Vamos lá!</Button>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </div>
    </StyledDialog>

}