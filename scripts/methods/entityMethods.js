function entityLayerToUILayer(entity) {
  entity.z = ws.ZINDEX_UI + ws.ZINDEX_ORDER;
}