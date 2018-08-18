module.exports = function (router) {

  /**
   * Account create
   */
  router.post('/done', function (req, res) {
    var data = {
      tenant: req.body.tenant,
      module: 'account-create',
      action: 'done',
      success: true
    };
    req.app.io.sockets.emit(data.module, data);
    res.json(data);
  });
};